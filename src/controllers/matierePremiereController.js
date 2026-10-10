const matierePremiereService = require("../services/matierePremiereService");

const creer = async (req, res) => {
    try {
        const data = req.body;

        const nouvelleMatiere = await matierePremiereService.creerMatierePremiere(data);

        return res.status(201).json({
            message: "Matière première créée avec succès.",
            data: nouvelleMatiere
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

const obtenirToutes = async (req, res) => {
    try {
        const matieres = await matierePremiereService.obtenirToutes();

        return res.status(200).json({
            message: "Liste des matières premières récupérée avec succès.",
            data: matieres
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const obtenirParId = async (req, res) => {
    try {
        const id = req.params.id;

        const matiere = await matierePremiereService.obtenirParId(id);

        return res.status(200).json({
            message: "Matière première récupérée avec succès.",
            data: matiere
        });

    } catch (error) {
        let status = 500;
        let message = error.message;

        if (error.name === "CastError") {
            status = 400;
            message = "Identifiant invalide.";
        } else if (error.message === "Matière première introuvable.") {
            status = 404;
        }

        return res.status(status).json({
            message: message
        });
    }
};

const modifier = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const resultat = await matierePremiereService.modifierMatierePremiere(id, data);

        return res.status(200).json({
            message: "Matière première modifiée avec succès.",
            data: resultat
        });

    } catch (error) {
        let status = 400;
        let message = error.message;

        if (error.name === "CastError") {
            status = 400;
            message = "Identifiant invalide.";
        } else if (error.message === "Matière première introuvable.") {
            status = 404;
        }

        return res.status(status).json({
            message: message
        });
    }
};

const supprimer = async (req, res) => {
    try {
        const id = req.params.id;

        const resultat = await matierePremiereService.supprimerMatierePremiere(id);

        return res.status(200).json({
            message: resultat.message
        });

    } catch (error) {
        let status = 500;
        let message = error.message;

        if (error.name === "CastError") {
            status = 400;
            message = "Identifiant invalide.";
        } else if (error.message === "Matière première introuvable.") {
            status = 404;
        }

        return res.status(status).json({
            message: message
        });
    }
};

module.exports = {
    creer,
    obtenirToutes,
    obtenirParId,
    modifier,
    supprimer
};
