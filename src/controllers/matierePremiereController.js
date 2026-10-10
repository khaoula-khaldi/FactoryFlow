const matierePremiereService = require("../services/matierePremiereService");


const creer = async (req, res) => {
    try {
        const data = req.body;

        const nouvelleMatiere =await matierePremiereService.creerMatierePremiere(data);

        return res.status(201).json({
            message: "Matière première créée avec succès.",
            data: nouvelleMatiere});
    } catch (error) {
        return res.status(400).json({message: error.message});
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
        const status = error.name === "CastError" ? 400 :
            error.message === "Matière première introuvable." ? 404 : 500;

        return res.status(status).json({
            message: status === 400
                ? "Identifiant invalide."
                : error.message
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
        const status = error.name === "CastError" ? 400 :
            error.message === "Matière première introuvable." ? 404 : 400;

        return res.status(status).json({
            message: status === 400 && error.name === "CastError"
                ? "Identifiant invalide."
                : error.message
        });
    }
};


const supprimer = async (req, res) => {
    try {
        const id = req.params.id;

        const resultat =
            await matierePremiereService.supprimerMatierePremiere(id);

        return res.status(200).json({
            message: resultat.message
        });
    } catch (error) {
        const status = error.name === "CastError" ? 400 :
            error.message === "Matière première introuvable." ? 404 : 500;

        return res.status(status).json({
            message: status === 400
                ? "Identifiant invalide."
                : error.message
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