
const OrdreFabricationService = require("../services/ordreFabricationService");

const creer = async (req, res) => {
    try {
        const resultat =
            await OrdreFabricationService.creerOrdreFabrication(req.body);

        return res.status(201).json({
            message: "Ordre de fabrication créé avec succès",
            resultat
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};


const demarrer = async (req, res) => {
    try {
        const resultat = await OrdreFabricationService.demarrerOrdreFabrication(req.params.id,req.utilisateur.userId,req.utilisateur.role);

        return res.status(200).json({
            message: "Ordre de fabrication démarré avec succès",
            resultat
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};


const terminer = async (req, res) => {
    try {
        const resultat =await OrdreFabricationService.terminerOrdreFabrication(req.params.id);
        return res.status(200).json({
            message: "Ordre de fabrication terminé avec succès",
            resultat
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};


const annuler = async (req, res) => {
    try {
        const resultat =await OrdreFabricationService.annulerOrdreFabrication(req.params.id);
        return res.status(200).json({
            message: "Ordre de fabrication annulé avec succès",
            resultat
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};


const obtenirTous = async (req, res) => {
    try {
        const resultat =await OrdreFabricationService.obtenirTousLesOrdres();

        return res.status(200).json({
            message: "Liste des ordres de fabrication",
            resultat
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


const obtenirParId = async (req, res) => {
    try {
        const resultat =await OrdreFabricationService.obtenirOrdreParId(req.params.id);

        return res.status(200).json({
            message: "Détails de l'ordre de fabrication",
            resultat
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};


module.exports = {
    creer,
    demarrer,
    terminer,
    annuler,
    obtenirTous,
    obtenirParId
};
