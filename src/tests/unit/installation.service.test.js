
const bcrypt = require("bcrypt");

const installationRepository = require("../../repositories/installationRepository");
const utilisateurRepository = require("../../repositories/utilisateurRepository");

const { install } = require("../../services/installationService");

jest.mock("bcrypt");
jest.mock("../../repositories/installationRepository");
jest.mock("../../repositories/utilisateurRepository");

describe("installationService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("doit installer l'application et créer un administrateur", async () => {
        installationRepository.findInstallation.mockResolvedValue(null);

        bcrypt.hash.mockResolvedValue("password-hashe");

        utilisateurRepository.createUser.mockResolvedValue({
            _id: "admin123",
            nom: "Khaoula",
            email: "admin@test.com",
            password: "password-hashe",
            role: "ADMIN"
        });

        installationRepository.createInstallation.mockResolvedValue({
            installed: true
        });

        const userData = {
            nom: "Khaoula",
            email: "admin@test.com",
            password: "password123"
        };

        const resultat = await install(userData);

        expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);

        expect(utilisateurRepository.createUser).toHaveBeenCalledWith({
            nom: "Khaoula",
            email: "admin@test.com",
            password: "password-hashe",
            role: "ADMIN"
        });

        expect(installationRepository.createInstallation).toHaveBeenCalledWith(
            expect.objectContaining({
                installed: true,
                dateInstallation: expect.any(Date)
            })
        );

        expect(resultat.role).toBe("ADMIN");
        expect(resultat.email).toBe("admin@test.com");
    });

    test("doit refuser une deuxième installation", async () => {
        installationRepository.findInstallation.mockResolvedValue({
            installed: true
        });

        await expect(
            install({
                nom: "Khaoula",
                email: "admin@test.com",
                password: "password123"
            })
        ).rejects.toThrow("Application déjà installée");

        expect(utilisateurRepository.createUser).not.toHaveBeenCalled();
        expect(installationRepository.createInstallation).not.toHaveBeenCalled();
    });
});
