const service = require("../../services/mouvementStockService");
const repository = require("../../repositories/mouvementStockRepository");
const MatierePremiere = require("../../models/MatierePremiere");

jest.mock("../../repositories/mouvementStockRepository");
jest.mock("../../models/MatierePremiere");

describe("creerMouvement", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("doit créer une entrée de stock", async () => {
        const data = {
            matierePremiereId: "123",
            sens: "ENTREE",
            quantite: 50
        };

        const nouveauMouvement = {
            _id: "m1",
            ...data,
            stockActuel: 50
        };

        MatierePremiere.findById.mockResolvedValue({
            _id: "123",
            reference: "MP-001"
        });

        repository.findByMatierePremiereId.mockResolvedValue([]);
        repository.createMouvement.mockResolvedValue(nouveauMouvement);

        const resultat = await service.creerMouvement(data);

        expect(MatierePremiere.findById).toHaveBeenCalledWith("123");
        expect(repository.createMouvement).toHaveBeenCalledWith({
            ...data,
            stockActuel: 50
        });
        expect(resultat).toEqual(nouveauMouvement);
    });

    test("doit retourner une erreur si la matière première n'existe pas", async () => {
        MatierePremiere.findById.mockResolvedValue(null);

        await expect(
            service.creerMouvement({
                matierePremiereId: "123",
                sens: "ENTREE",
                quantite: 50
            })
        ).rejects.toThrow("Cette matière première n'existe pas.");

        expect(repository.createMouvement).not.toHaveBeenCalled();
    });

    test("doit retourner une erreur si le sens est invalide", async () => {
        MatierePremiere.findById.mockResolvedValue({ _id: "123" });

        await expect(
            service.creerMouvement({
                matierePremiereId: "123",
                sens: "AUTRE",
                quantite: 50
            })
        ).rejects.toThrow("Le sens doit être ENTREE ou SORTIE.");

        expect(repository.createMouvement).not.toHaveBeenCalled();
    });

    test("doit retourner une erreur si la quantité est invalide", async () => {
        MatierePremiere.findById.mockResolvedValue({ _id: "123" });

        await expect(
            service.creerMouvement({
                matierePremiereId: "123",
                sens: "ENTREE",
                quantite: -5
            })
        ).rejects.toThrow("La quantité doit être un nombre positif.");

        expect(repository.createMouvement).not.toHaveBeenCalled();
    });

    test("doit refuser une sortie si le stock est insuffisant", async () => {
        MatierePremiere.findById.mockResolvedValue({ _id: "123" });

        repository.findByMatierePremiereId.mockResolvedValue([
            { sens: "ENTREE", quantite: 10 }
        ]);

        await expect(
            service.creerMouvement({
                matierePremiereId: "123",
                sens: "SORTIE",
                quantite: 15
            })
        ).rejects.toThrow("Stock insuffisant pour effectuer cette sortie.");

        expect(repository.createMouvement).not.toHaveBeenCalled();
    });
});

describe("calculerStockActuel", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("doit calculer le stock en tenant compte des entrées et des sorties", async () => {
        repository.findByMatierePremiereId.mockResolvedValue([
            { sens: "ENTREE", quantite: 100 },
            { sens: "SORTIE", quantite: 30 },
            { sens: "ENTREE", quantite: 20 }
        ]);

        const resultat = await service.calculerStockActuel("123");

        expect(repository.findByMatierePremiereId).toHaveBeenCalledWith("123");
        expect(resultat).toBe(90);
    });

    test("doit retourner zéro si aucun mouvement n'existe", async () => {
        repository.findByMatierePremiereId.mockResolvedValue([]);

        const resultat = await service.calculerStockActuel("123");

        expect(resultat).toBe(0);
    });
});

describe("obtenirTous", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("doit retourner tous les mouvements", async () => {
        const mouvements = [
            { _id: "m1", sens: "ENTREE", quantite: 50 },
            { _id: "m2", sens: "SORTIE", quantite: 10 }
        ];

        repository.findAll.mockResolvedValue(mouvements);

        const resultat = await service.obtenirTous();

        expect(repository.findAll).toHaveBeenCalledTimes(1);
        expect(resultat).toEqual(mouvements);
    });
});

describe("obtenirParId", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("doit retourner le mouvement correspondant à son ID", async () => {
        const mouvement = {
            _id: "m1",
            sens: "ENTREE",
            quantite: 50
        };

        repository.findById.mockResolvedValue(mouvement);

        const resultat = await service.obtenirParId("m1");

        expect(repository.findById).toHaveBeenCalledWith("m1");
        expect(resultat).toEqual(mouvement);
    });

    test("doit retourner null si le mouvement n'existe pas", async () => {
        repository.findById.mockResolvedValue(null);

        const resultat = await service.obtenirParId("inexistant");

        expect(resultat).toBeNull();
    });
});

describe("obtenirParMatierePremiere", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("doit retourner les mouvements d'une matière première existante", async () => {
        const mouvements = [
            { _id: "m1", sens: "ENTREE", quantite: 50 }
        ];

        MatierePremiere.findById.mockResolvedValue({ _id: "123" });
        repository.findByMatierePremiereId.mockResolvedValue(mouvements);

        const resultat = await service.obtenirParMatierePremiere("123");

        expect(MatierePremiere.findById).toHaveBeenCalledWith("123");
        expect(repository.findByMatierePremiereId).toHaveBeenCalledWith("123");
        expect(resultat).toEqual(mouvements);
    });

    test("doit retourner une erreur si la matière première n'existe pas", async () => {
        MatierePremiere.findById.mockResolvedValue(null);

        await expect(
            service.obtenirParMatierePremiere("inexistant")
        ).rejects.toThrow("Cette matière première n'existe pas.");

        expect(repository.findByMatierePremiereId).not.toHaveBeenCalled();
    });
});