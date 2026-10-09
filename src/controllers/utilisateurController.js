
const authService = require("../services/utilisateurService");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email et mot de passe obligatoires"
            });
        }

        const utilisateur = await authService.login(email, password);

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

module.exports = {
    login
};