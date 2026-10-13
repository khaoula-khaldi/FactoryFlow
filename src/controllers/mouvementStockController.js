
const mouvementStockService = require("../services/mouvementStockService");

const creer = async (req, res) => {
    try {
        const data = req.body;
        const mouvement = await mouvementStockService.creerMouvement(data);

        return res.status(201).json({
            message: "Mouvement créé avec succès.",
            mouvement
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

const obtenirStockActuel = async (req, res) => {
    try {
        const { matierePremiereId } = req.params;

        const stock = await mouvementStockService.calculerStockActuel(
            matierePremiereId
        );

        return res.status(200).json({
            message: "Stock actuel récupéré avec succès",
            matierePremiereId,
            stock
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const obtenirTous = async (req, res) => {
    try {
        const mouvements = await mouvementStockService.obtenirTous();

        return res.status(200).json({
            message: "Liste des mouvements.",
            mouvements
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
        const mouvement = await mouvementStockService.obtenirParId(id);

        if (!mouvement) {
            return res.status(404).json({
                message: "Mouvement introuvable."
            });
        }

        return res.status(200).json({
            message: "Mouvement récupéré avec succès.",
            mouvement
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

const obtenirParMatierePremiere = async (req, res) => {
    try {
        const { matierePremiereId } = req.params;

        const mouvements =
            await mouvementStockService.obtenirParMatierePremiere(
                matierePremiereId
            );

        return res.status(200).json({
            message: "Mouvements de cette matière première.",
            mouvements
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    creer,
    obtenirTous,
    obtenirParId,
    obtenirParMatierePremiere,
    obtenirStockActuel
};
