const installationService = require("../services/installationService");

const install = async (req, res) => {
    try {
        const admin = await installationService.install(req.body);

        res.status(201).json({
            message: "Application installée avec succès",
            admin: {
                id: admin._id,
                nom: admin.nom,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        const statusCode =
            error.message === "Application déjà installée" ||
            error.message === "Un administrateur existe déjà" ||
            error.message === "Cet email est déjà utilisé"
                ? 409
                : 400;

        res.status(statusCode).json({
            message: error.message
        });
    }
};

module.exports = {
    install
};