
const utilisateurService = require("../services/utilisateurService");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email et mot de passe obligatoires"
            });
        }

        const utilisateur = await utilisateurService.login(email, password);

        return res.status(200).json({
            message: "Connexion réussie",
            utilisateur
        });
    } catch (error) {
        if (error.message === "Email ou mot de passe incorrect") {
            return res.status(401).json({
                message: error.message
            });
        }

        console.error("Erreur login :", error.message);

        return res.status(500).json({
            message: "Erreur interne du serveur"
        });
    }
};
const creerUtilisateur = async (req, res) => {
    try {
        const { nom, email, password, role } = req.body;

        const utilisateur = await utilisateurService.creerUtilisateur(nom,email,password,role);

        return res.status(201).json({
            message: "Utilisateur cree avec succès",
            utilisateur
        });

    } catch (error) {
        if (error.message === "Cet email est déjà utilisé") {
            return res.status(409).json({
                message: error.message
            });
        }

        if (
            error.message === "Le nom est obligatoire" ||
            error.message === "L'email est obligatoire" ||
            error.message === "Le mot de passe est obligatoire" ||
            error.message === "Le rôle doit être ADMIN ou OPERATEUR"
        ) {
            return res.status(400).json({
                message: error.message
            });
        }

        console.error("Erreur création utilisateur :", error.message);

        return res.status(500).json({
            message: "Erreur interne du serveur"
        });
    }
};
module.exports = {login,creerUtilisateur};