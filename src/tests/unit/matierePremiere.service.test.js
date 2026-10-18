const service = require("../../services/matierePremiereService");
const repository = require("../../repositories/matierePremiereRepository");

jest.mock("../../repositories/matierePremiereRepository");

describe("creerMatierePremiere", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("doit créer une matière première si la référence n'existe pas", async () => {
        const data = {
            reference: "MP-001",
            nom: "Acier",
            uniteMesure: "kg",
            seuilAlerte: 10
        };

        const nouvelleMatiere = {
            _id: "123",
            ...data
        };

        repository.findByReference.mockResolvedValue(null);
        repository.createMatierePremiere.mockResolvedValue(nouvelleMatiere);

        const resultat = await service.creerMatierePremiere(data);

        expect(repository.findByReference).toHaveBeenCalledWith(data.reference);
        expect(repository.createMatierePremiere).toHaveBeenCalledWith(data);
        expect(resultat).toEqual(nouvelleMatiere);
    });

    test("doit retourner une erreur si la référence existe déjà", async () => {
        const data = {
            reference: "MP-001",
            nom: "Acier",
            uniteMesure: "kg",
            seuilAlerte: 10
        };

        repository.findByReference.mockResolvedValue({
            _id: "123",
            reference: "MP-001"
        });

        await expect(
            service.creerMatierePremiere(data)
        ).rejects.toThrow("Cette référence existe déjà.");

        expect(repository.createMatierePremiere).not.toHaveBeenCalled();
    });
});

describe("obtenirToutes", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("doit retourner toutes les matières premières", async () => {
        const matieres = [
            { _id: "1", reference: "MP-001", nom: "Acier" },
            { _id: "2", reference: "MP-002", nom: "Plastique" }
        ];

        repository.findAll.mockResolvedValue(matieres);

        const resultat = await service.obtenirToutes();

        expect(repository.findAll).toHaveBeenCalledTimes(1);
        expect(resultat).toEqual(matieres);
    });
});

describe("obtenirParId", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("doit retourner une matière première si elle existe", async () => {
        const matiere = {
            _id: "123",
            reference: "MP-001",
            nom: "Acier"
        };

        repository.findById.mockResolvedValue(matiere);

        const resultat = await service.obtenirParId("123");

        expect(repository.findById).toHaveBeenCalledWith("123");
        expect(resultat).toEqual(matiere);
    });

    test("doit retourner une erreur si la matière première n'existe pas", async () => {
        repository.findById.mockResolvedValue(null);

        await expect(
            service.obtenirParId("999")
        ).rejects.toThrow("Matière première introuvable.");
    });
});

describe("modifierMatierePremiere", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("doit modifier une matière première", async () => {
        const id = "123";
        const matiereExistante = {
            _id: "123",
            reference: "MP-001",
            nom: "Acier",
            uniteMesure: "kg",
            seuilAlerte: 10
        };

        const data = { nom: "Acier inoxydable" };

        const matiereModifiee = {
            ...matiereExistante,
            ...data
        };

        repository.findById.mockResolvedValue(matiereExistante);
        repository.updateMatierePremiere.mockResolvedValue(matiereModifiee);

        const resultat = await service.modifierMatierePremiere(id, data);

        expect(repository.findById).toHaveBeenCalledWith(id);
        expect(repository.updateMatierePremiere).toHaveBeenCalledWith(id, data);
        expect(resultat).toEqual(matiereModifiee);
    });

    test("doit retourner une erreur si la matière première n'existe pas", async () => {
        repository.findById.mockResolvedValue(null);

        await expect(
            service.modifierMatierePremiere("999", { nom: "Acier" })
        ).rejects.toThrow("Matière première introuvable.");

        expect(repository.updateMatierePremiere).not.toHaveBeenCalled();
    });

    test("doit retourner une erreur si la référence est déjà utilisée par une autre matière", async () => {
        const id = "123";
        const matiereExistante = {
            _id: "123",
            reference: "MP-001"
        };

        const autreMatiere = {
            _id: "456",
            reference: "MP-002"
        };

        repository.findById.mockResolvedValue(matiereExistante);
        repository.findByReference.mockResolvedValue(autreMatiere);

        await expect(
            service.modifierMatierePremiere(id, { reference: "MP-002" })
        ).rejects.toThrow("Cette référence est déjà utilisée.");

        expect(repository.updateMatierePremiere).not.toHaveBeenCalled();
    });
});

describe("supprimerMatierePremiere", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("doit supprimer une matière première si elle existe", async () => {
        const id = "123";
        const matiere = { _id: id, reference: "MP-001" };

        repository.findById.mockResolvedValue(matiere);
        repository.deleteMatierePremiere.mockResolvedValue(matiere);

        const resultat = await service.supprimerMatierePremiere(id);

        expect(repository.findById).toHaveBeenCalledWith(id);
        expect(repository.deleteMatierePremiere).toHaveBeenCalledWith(id);
        expect(resultat).toEqual({
            message: "Matière première supprimée avec succès."
        });
    });

    test("doit retourner une erreur si la matière première n'existe pas", async () => {
        repository.findById.mockResolvedValue(null);

        await expect(
            service.supprimerMatierePremiere("999")
        ).rejects.toThrow("Matière première introuvable.");

        expect(repository.deleteMatierePremiere).not.toHaveBeenCalled();
    });
});