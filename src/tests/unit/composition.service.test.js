
const CompositionRepository = require("../../repositories/compositionRepository");
const Produit = require("../../models/Produit");
const MatierePremiere = require("../../models/MatierePremiere");

const {
    creerComposition,
    obtenirToutes,
    obtenirParId,
    obtenirParProduit,
    modifierComposition,
    supprimerComposition
} = require("../../services/compositionService");

jest.mock("../../repositories/compositionRepository");
jest.mock("../../models/Produit");
jest.mock("../../models/MatierePremiere");

describe("compositionService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("doit créer une composition", async () => {
        Produit.findById.mockResolvedValue({ _id: "prod1" });
        MatierePremiere.findById.mockResolvedValue({ _id: "mat1" });
        CompositionRepository.findByProduitAndMatiere.mockResolvedValue(null);

        const data = {
            produitId: "prod1",
            matierePremiereId: "mat1",
            quantite: 2
        };

        CompositionRepository.createComposition.mockResolvedValue(data);

        const resultat = await creerComposition(data);

        expect(resultat).toEqual(data);
        expect(CompositionRepository.createComposition).toHaveBeenCalledWith(data);
    });

    test("doit refuser un produit inexistant", async () => {
        Produit.findById.mockResolvedValue(null);

        await expect(
            creerComposition({
                produitId: "prod1",
                matierePremiereId: "mat1",
                quantite: 2
            })
        ).rejects.toThrow("Produit introuvable.");
    });

    test("doit retourner toutes les compositions", async () => {
        const compositions = [{ _id: "comp1" }, { _id: "comp2" }];

        CompositionRepository.findAll.mockResolvedValue(compositions);

        const resultat = await obtenirToutes();

        expect(resultat).toEqual(compositions);
    });

    test("doit retourner une composition par son ID", async () => {
        const composition = { _id: "comp1" };

        CompositionRepository.findById.mockResolvedValue(composition);

        const resultat = await obtenirParId("comp1");

        expect(resultat).toEqual(composition);
    });

    test("doit retourner les compositions d'un produit", async () => {
        const compositions = [{ produitId: "prod1", matierePremiereId: "mat1" }];

        Produit.findById.mockResolvedValue({ _id: "prod1" });
        CompositionRepository.findByProduitId.mockResolvedValue(compositions);

        const resultat = await obtenirParProduit("prod1");

        expect(resultat).toEqual(compositions);
    });

    test("doit modifier une composition existante", async () => {
        const composition = {
            _id: "comp1",
            produitId: "prod1",
            matierePremiereId: "mat1"
        };

        const data = { quantite: 5 };
        const compositionModifiee = { ...composition, quantite: 5 };

        CompositionRepository.findById.mockResolvedValue(composition);
        CompositionRepository.findByProduitAndMatiere.mockResolvedValue(composition);
        CompositionRepository.updateComposition.mockResolvedValue(compositionModifiee);

        const resultat = await modifierComposition("comp1", data);

        expect(resultat).toEqual(compositionModifiee);
        expect(CompositionRepository.updateComposition).toHaveBeenCalledWith("comp1", data);
    });

    test("doit supprimer une composition existante", async () => {
        CompositionRepository.findById.mockResolvedValue({ _id: "comp1" });
        CompositionRepository.deleteComposition.mockResolvedValue(true);

        const resultat = await supprimerComposition("comp1");

        expect(resultat).toEqual({
            message: "Composition supprimée avec succès."
        });

        expect(CompositionRepository.deleteComposition).toHaveBeenCalledWith("comp1");
    });
});
