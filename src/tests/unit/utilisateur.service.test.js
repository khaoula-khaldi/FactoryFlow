const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const utilisateurRepository = require("../../repositories/utilisateurRepository");
const {
    login,
    creerUtilisateur
} = require("../../services/utilisateurService");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../repositories/utilisateurRepository");

describe("utilisateurService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.JWT_SECRET = "test-secret";
    });

    describe("creerUtilisateur", () => {
        test("doit créer un utilisateur avec un mot de passe hashé", async () => {
            utilisateurRepository.findByEmail.mockResolvedValue(null);

            bcrypt.hash.mockResolvedValue("password-hashe");

            utilisateurRepository.createUser.mockResolvedValue({
                _id: "user123",
                nom: "Khaoula",
                email: "khaoula@test.com",
                role: "OPERATEUR"
            });

            const resultat = await creerUtilisateur(
                "Khaoula",
                "khaoula@test.com",
                "password123",
                "OPERATEUR"
            );

            expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);

            expect(utilisateurRepository.createUser).toHaveBeenCalledWith({
                nom: "Khaoula",
                email: "khaoula@test.com",
                password: "password-hashe",
                role: "OPERATEUR"
            });

            expect(resultat).toEqual({
                id: "user123",
                nom: "Khaoula",
                email: "khaoula@test.com",
                role: "OPERATEUR"
            });
        });

        test("doit refuser un email déjà utilisé", async () => {
            utilisateurRepository.findByEmail.mockResolvedValue({
                email: "khaoula@test.com"
            });

            await expect(
                creerUtilisateur(
                    "Khaoula",
                    "khaoula@test.com",
                    "password123",
                    "OPERATEUR"
                )
            ).rejects.toThrow("Cet email est déjà utilisé");
        });
    });

    describe("login", () => {
        test("doit connecter un utilisateur avec les bonnes informations", async () => {
            utilisateurRepository.findByEmail.mockResolvedValue({
                _id: "user123",
                nom: "Khaoula",
                email: "khaoula@test.com",
                password: "password-hashe",
                role: "OPERATEUR"
            });

            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue("token-test");

            const resultat = await login(
                "khaoula@test.com",
                "password123"
            );

            expect(bcrypt.compare).toHaveBeenCalledWith(
                "password123",
                "password-hashe"
            );

            expect(jwt.sign).toHaveBeenCalledWith(
                {
                    userId: "user123",
                    role: "OPERATEUR"
                },
                "test-secret",
                {
                    expiresIn: "1h"
                }
            );

            expect(resultat).toEqual({
                id: "user123",
                nom: "Khaoula",
                email: "khaoula@test.com",
                role: "OPERATEUR",
                token: "token-test"
            });
        });

        test("doit refuser un email inexistant", async () => {
            utilisateurRepository.findByEmail.mockResolvedValue(null);

            await expect(
                login("inconnu@test.com", "password123")
            ).rejects.toThrow("Email ou mot de passe incorrect");
        });

        test("doit refuser un mot de passe incorrect", async () => {
            utilisateurRepository.findByEmail.mockResolvedValue({
                _id: "user123",
                nom: "Khaoula",
                email: "khaoula@test.com",
                password: "password-hashe",
                role: "OPERATEUR"
            });

            bcrypt.compare.mockResolvedValue(false);

            await expect(
                login("khaoula@test.com", "mauvais-password")
            ).rejects.toThrow("Email ou mot de passe incorrect");
        });
    });
});
