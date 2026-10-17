const OrdreFabricationRepository = require("../../repositories/ordreFabricationRepository");
const CompositionRepository = require("../../repositories/compositionRepository");
const DetailOrdreRepository = require("../../repositories/detailOrdreRepository");
const MouvementStockService = require("../../services/mouvementStockService");
const UserRepository = require("../../repositories/utilisateurRepository");

const {
    creerOrdreFabrication,
    obtenirOrdresParOperateur,
    demarrerOrdreFabrication,
    terminerOrdreFabrication,
    annulerOrdreFabrication,
    obtenirTousLesOrdres,
    obtenirOrdreParId,
    verifierAccesOrdre
} = require("../../services/ordreFabricationService");

jest.mock("../../repositories/ordreFabricationRepository");
jest.mock("../../repositories/compositionRepository");
jest.mock("../../repositories/detailOrdreRepository");
jest.mock("../../services/mouvementStockService");
jest.mock("../../repositories/utilisateurRepository");

describe("OrdreFabricationService", () => {

    beforeEach(() => {
        jest.clearAllMocks();

        UserRepository.findById.mockResolvedValue({
            _id: "operateur1",
            role: "OPERATEUR"
        });

        CompositionRepository.findByProduitId.mockResolvedValue([
            {
                matierePremiereId: "matiere1",
                quantite: 5
            }
        ]);

        MouvementStockService.calculerStockActuel.mockResolvedValue(100);

        MouvementStockService.creerMouvement.mockResolvedValue({});

        OrdreFabricationRepository.createOrdre.mockResolvedValue({
            _id: "ordre123",
            numero: "OF-123",
            statut: "PLANIFIE"
        });

        DetailOrdreRepository.createDetail.mockResolvedValue({
            _id: "detail123",
            ordreFabricationId: "ordre123",
            produitId: "produit123",
            quantite: 3
        });

        OrdreFabricationRepository.findById.mockResolvedValue({
            _id: "ordre123",
            statut: "PLANIFIE",
            operateurId: "operateur1",
            compositionSnapshot: [
                {
                    matierePremiereId: "matiere1",
                    quantiteMatiere: 15
                }
            ]
        });

        OrdreFabricationRepository.updateOrdre.mockResolvedValue({
            _id: "ordre123",
            statut: "EN_COURS"
        });

        OrdreFabricationRepository.findByOperateurId.mockResolvedValue([]);
        OrdreFabricationRepository.findAll.mockResolvedValue([]);
        DetailOrdreRepository.findByOrdreFabricationId.mockResolvedValue([]);
    });

    // CREATION

    test("doit créer un ordre et calculer les matières nécessaires", async () => {
        await creerOrdreFabrication({
            produitId: "produit123",
            quantite: 3,
            operateurId: "operateur1"
        });

        expect(OrdreFabricationRepository.createOrdre).toHaveBeenCalledWith(
            expect.objectContaining({
                statut: "PLANIFIE",
                operateurId: "operateur1",
                compositionSnapshot: [
                    {
                        matierePremiereId: "matiere1",
                        quantiteMatiere: 15
                    }
                ]
            })
        );

        expect(DetailOrdreRepository.createDetail).toHaveBeenCalledWith({
            ordreFabricationId: "ordre123",
            produitId: "produit123",
            quantite: 3
        });
    });

    test("doit refuser la création si le stock est insuffisant", async () => {
        MouvementStockService.calculerStockActuel.mockResolvedValue(10);

        await expect(
            creerOrdreFabrication({
                produitId: "produit123",
                quantite: 3,
                operateurId: "operateur1"
            })
        ).rejects.toThrow(/Stock insuffisant/i);

        expect(OrdreFabricationRepository.createOrdre).not.toHaveBeenCalled();
        expect(DetailOrdreRepository.createDetail).not.toHaveBeenCalled();
    });

    test("doit refuser si l'opérateur n'existe pas", async () => {
        UserRepository.findById.mockResolvedValue(null);

        await expect(
            creerOrdreFabrication({
                produitId: "produit123",
                quantite: 3,
                operateurId: "operateur1"
            })
        ).rejects.toThrow("Opérateur introuvable.");

        expect(OrdreFabricationRepository.createOrdre).not.toHaveBeenCalled();
    });

    test("doit refuser si l'utilisateur n'est pas un opérateur", async () => {
        UserRepository.findById.mockResolvedValue({
            _id: "admin1",
            role: "ADMIN"
        });

        await expect(
            creerOrdreFabrication({
                produitId: "produit123",
                quantite: 3,
                operateurId: "admin1"
            })
        ).rejects.toThrow("L'utilisateur sélectionné n'est pas un opérateur.");

        expect(OrdreFabricationRepository.createOrdre).not.toHaveBeenCalled();
    });

    test("doit refuser si le produit n'est pas fourni", async () => {
        await expect(
            creerOrdreFabrication({
                quantite: 3,
                operateurId: "operateur1"
            })
        ).rejects.toThrow("Le produit est obligatoire.");
    });

    test("doit refuser si la quantité est égale à zéro", async () => {
        await expect(
            creerOrdreFabrication({
                produitId: "produit123",
                quantite: 0,
                operateurId: "operateur1"
            })
        ).rejects.toThrow();
    });

    test("doit refuser si la quantité est négative", async () => {
        await expect(
            creerOrdreFabrication({
                produitId: "produit123",
                quantite: -2,
                operateurId: "operateur1"
            })
        ).rejects.toThrow();
    });

    test("doit refuser si la quantité n'est pas un nombre", async () => {
        await expect(
            creerOrdreFabrication({
                produitId: "produit123",
                quantite: "3",
                operateurId: "operateur1"
            })
        ).rejects.toThrow();
    });

    test("doit refuser si le produit n'a pas de composition", async () => {
        CompositionRepository.findByProduitId.mockResolvedValue([]);

        await expect(
            creerOrdreFabrication({
                produitId: "produit123",
                quantite: 3,
                operateurId: "operateur1"
            })
        ).rejects.toThrow("ce produit n'a pas de composition");
    });

    // ORDRES PAR OPERATEUR

    test("doit récupérer les ordres d'un opérateur", async () => {
        const ordres = [{ _id: "ordre123" }];

        OrdreFabricationRepository.findByOperateurId.mockResolvedValue(ordres);

        const resultat = await obtenirOrdresParOperateur("operateur1");

        expect(resultat).toEqual(ordres);
        expect(OrdreFabricationRepository.findByOperateurId)
            .toHaveBeenCalledWith("operateur1");
    });

    // DEMARRAGE

    test("doit démarrer un ordre planifié et enregistrer les sorties de stock", async () => {
        OrdreFabricationRepository.updateOrdre.mockResolvedValue({
            _id: "ordre123",
            statut: "EN_COURS"
        });

        const resultat = await demarrerOrdreFabrication(
            "ordre123",
            "operateur1",
            "OPERATEUR"
        );

        expect(MouvementStockService.creerMouvement).toHaveBeenCalledWith({
            matierePremiereId: "matiere1",
            sens: "SORTIE",
            quantite: 15
        });

        expect(OrdreFabricationRepository.updateOrdre).toHaveBeenCalledWith(
            "ordre123",
            expect.objectContaining({ statut: "EN_COURS" })
        );

        expect(resultat.statut).toBe("EN_COURS");
    });

    test("doit refuser de démarrer un ordre inexistant", async () => {
        OrdreFabricationRepository.findById.mockResolvedValue(null);

        await expect(
            demarrerOrdreFabrication("inexistant", "operateur1", "OPERATEUR")
        ).rejects.toThrow("Ordre de fabrication introuvable.");

        expect(OrdreFabricationRepository.updateOrdre).not.toHaveBeenCalled();
    });

    test("doit refuser de démarrer un ordre qui n'est pas planifié", async () => {
        OrdreFabricationRepository.findById.mockResolvedValue({
            _id: "ordre123",
            statut: "EN_COURS",
            operateurId: "operateur1",
            compositionSnapshot: []
        });

        await expect(
            demarrerOrdreFabrication("ordre123", "operateur1", "OPERATEUR")
        ).rejects.toThrow("Cet ordre ne peut pas être démarré.");
    });

    test("doit refuser un opérateur non assigné", async () => {
        await expect(
            demarrerOrdreFabrication("ordre123", "operateur2", "OPERATEUR")
        ).rejects.toThrow("Cet ordre ne vous est pas assigné.");

        expect(OrdreFabricationRepository.updateOrdre).not.toHaveBeenCalled();
    });

    test("doit refuser de démarrer si le stock est insuffisant", async () => {
        MouvementStockService.calculerStockActuel.mockResolvedValue(10);

        await expect(
            demarrerOrdreFabrication("ordre123", "operateur1", "OPERATEUR")
        ).rejects.toThrow(/Stock insuffisant/i);

        expect(MouvementStockService.creerMouvement).not.toHaveBeenCalled();
        expect(OrdreFabricationRepository.updateOrdre).not.toHaveBeenCalled();
    });

    // TERMINAISON

    test("doit terminer un ordre en cours", async () => {
        OrdreFabricationRepository.findById.mockResolvedValue({
            _id: "ordre123",
            statut: "EN_COURS"
        });

        OrdreFabricationRepository.updateOrdre.mockResolvedValue({
            _id: "ordre123",
            statut: "TERMINE"
        });

        const resultat = await terminerOrdreFabrication("ordre123");

        expect(OrdreFabricationRepository.updateOrdre).toHaveBeenCalledWith(
            "ordre123",
            expect.objectContaining({ statut: "TERMINE" })
        );

        expect(resultat.statut).toBe("TERMINE");
    });

    test("doit refuser de terminer un ordre inexistant", async () => {
        OrdreFabricationRepository.findById.mockResolvedValue(null);

        await expect(
            terminerOrdreFabrication("inexistant")
        ).rejects.toThrow("Ordre de fabrication introuvable.");
    });

    test("doit refuser de terminer un ordre qui n'est pas en cours", async () => {
        await expect(
            terminerOrdreFabrication("ordre123")
        ).rejects.toThrow("Seul un ordre en cours peut être terminé.");
    });

    // ANNULATION

    test("doit annuler un ordre planifié", async () => {
        OrdreFabricationRepository.updateOrdre.mockResolvedValue({
            _id: "ordre123",
            statut: "ANNULE"
        });

        const resultat = await annulerOrdreFabrication("ordre123");

        expect(OrdreFabricationRepository.updateOrdre).toHaveBeenCalledWith(
            "ordre123",
            { statut: "ANNULE" }
        );

        expect(resultat.statut).toBe("ANNULE");
    });

    test("doit refuser d'annuler un ordre inexistant", async () => {
        OrdreFabricationRepository.findById.mockResolvedValue(null);

        await expect(
            annulerOrdreFabrication("inexistant")
        ).rejects.toThrow("Ordre de fabrication introuvable.");
    });

    test("doit refuser d'annuler un ordre qui n'est pas planifié", async () => {
        OrdreFabricationRepository.findById.mockResolvedValue({
            _id: "ordre123",
            statut: "EN_COURS"
        });

        await expect(
            annulerOrdreFabrication("ordre123")
        ).rejects.toThrow("Seul un ordre planifié peut être annulé.");
    });

    // TOUS LES ORDRES

    test("doit récupérer tous les ordres", async () => {
        const ordres = [{ _id: "ordre1" }, { _id: "ordre2" }];

        OrdreFabricationRepository.findAll.mockResolvedValue(ordres);

        const resultat = await obtenirTousLesOrdres();

        expect(resultat).toEqual(ordres);
        expect(OrdreFabricationRepository.findAll).toHaveBeenCalled();
    });

    // ORDRE PAR ID

    test("doit récupérer un ordre avec ses détails", async () => {
        const ordre = { _id: "ordre123", statut: "PLANIFIE" };
        const details = [{ _id: "detail123", quantite: 3 }];

        OrdreFabricationRepository.findById.mockResolvedValue(ordre);
        DetailOrdreRepository.findByOrdreFabricationId.mockResolvedValue(details);

        const resultat = await obtenirOrdreParId("ordre123");

        expect(resultat).toEqual({ ordre, details });
        expect(DetailOrdreRepository.findByOrdreFabricationId)
            .toHaveBeenCalledWith("ordre123");
    });

    test("doit refuser de récupérer un ordre inexistant", async () => {
        OrdreFabricationRepository.findById.mockResolvedValue(null);

        await expect(
            obtenirOrdreParId("inexistant")
        ).rejects.toThrow("Ordre de fabrication introuvable.");

        expect(DetailOrdreRepository.findByOrdreFabricationId)
            .not.toHaveBeenCalled();
    });

    // VERIFICATION DES ACCES

    test("doit autoriser l'opérateur assigné", () => {
        const ordre = { operateurId: "operateur1" };

        expect(() =>
            verifierAccesOrdre(ordre, "operateur1", "OPERATEUR")
        ).not.toThrow();
    });

    test("doit refuser un opérateur non assigné", () => {
        const ordre = { operateurId: "operateur1" };

        expect(() =>
            verifierAccesOrdre(ordre, "operateur2", "OPERATEUR")
        ).toThrow("Cet ordre ne vous est pas assigné.");
    });

    test("doit autoriser un administrateur", () => {
        const ordre = { operateurId: "operateur1" };

        expect(() =>
            verifierAccesOrdre(ordre, "admin1", "ADMIN")
        ).not.toThrow();
    });

});
