const compositionService = require("../services/compositionService");

const creer = async (req, res) => {
    try {
        const data = req.body;
        const composition = await compositionService.creerComposition(data);
        return res.status(201).json({
            message: "Composition créée avec succès.",
            composition
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

const obtenirToutes = async (req, res) => {
    try {
        const compositions = await compositionService.obtenirToutes();
        return res.status(200).json({
            compositions
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
        const composition = await compositionService.obtenirParId(id);
        return res.status(200).json({
            composition
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
};

const obtenirParProduit = async (req, res) => {
    try {
        const produitId = req.params.produitId;
        const compositions =await compositionService.obtenirParProduit(produitId);
        return res.status(200).json({
            compositions
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
};

const modifier = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const resultat =await compositionService.modifierComposition(id, data);
        return res.status(200).json({
            message: "Composition modifiée avec succès.",
            resultat
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

const supprimer = async (req, res) => {
    try {
        const id = req.params.id;
        const resultat =await compositionService.supprimerComposition(id);
        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
};

module.exports = {
    creer,
    obtenirToutes,
    obtenirParId,
    obtenirParProduit,
    modifier,
    supprimer
};