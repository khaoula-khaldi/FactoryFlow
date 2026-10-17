
const ProduitRepository = require("../../repositories/produitRepository");

const {
    creerProduit,
    obtenirTous,
    obtenirParId,
    modifierProduit,
    supprimerProduit
} = require("../../services/produitService");

jest.mock("../../repositories/produitRepository");

describe("produitService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("doit créer un produit", async () => {
        ProduitRepository.findByReference.mockResolvedValue(null);

        const produit = {
            _id: "produit123",
            reference: "P001",
            nom: "Chaise"
        };

        ProduitRepository.createProduit.mockResolvedValue(produit);

        const resultat = await creerProduit({
            reference: "P001",
            nom: "Chaise"
        });

        expect(resultat).toEqual(produit);
    });

    test("doit refuser une référence déjà utilisée", async () => {
        ProduitRepository.findByReference.mockResolvedValue({
            reference: "P001"
        });

        await expect(
            creerProduit({
                reference: "P001",
                nom: "Chaise"
            })
        ).rejects.toThrow("Cette référence existe déjà.");
    });

    test("doit retourner tous les produits", async () => {
        const produits = [
            { _id: "1", reference: "P001", nom: "Chaise" },
            { _id: "2", reference: "P002", nom: "Table" }
        ];

        ProduitRepository.findAll.mockResolvedValue(produits);

        const resultat = await obtenirTous();

        expect(resultat).toEqual(produits);
    });

    test("doit retourner un produit par son ID", async () => {
        const produit = {
            _id: "produit123",
            reference: "P001",
            nom: "Chaise"
        };

        ProduitRepository.findById.mockResolvedValue(produit);

        const resultat = await obtenirParId("produit123");

        expect(resultat).toEqual(produit);
    });

    test("doit retourner une erreur si le produit est introuvable", async () => {
        ProduitRepository.findById.mockResolvedValue(null);

        await expect(
            obtenirParId("inexistant")
        ).rejects.toThrow("produit introuvable");
    });

    test("doit modifier un produit existant", async () => {
        const produitExistant = {
            _id: "produit123",
            reference: "P001",
            nom: "Chaise"
        };

        const produitModifie = {
            _id: "produit123",
            reference: "P001",
            nom: "Chaise moderne"
        };

        ProduitRepository.findById.mockResolvedValue(produitExistant);
        ProduitRepository.updateProduit.mockResolvedValue(produitModifie);

        const resultat = await modifierProduit("produit123", {
            nom: "Chaise moderne"
        });

        expect(resultat).toEqual(produitModifie);
    });

    test("doit supprimer un produit existant", async () => {
        ProduitRepository.findById.mockResolvedValue({
            _id: "produit123",
            reference: "P001",
            nom: "Chaise"
        });

        ProduitRepository.deleteProduit.mockResolvedValue(true);

        const resultat = await supprimerProduit("produit123");

        expect(resultat).toEqual({
            message: "Produit supprimé avec succès."
        });

        expect(ProduitRepository.deleteProduit).toHaveBeenCalledWith(
            "produit123"
        );
    });
});
