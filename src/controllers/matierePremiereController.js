const matierePremiereService = require("../services/matierePremiereService");

const creer = async (req, res) => {
    try {
        const data = req.body;
        const nouvelleMatiere = matierePremiereService.creerMatierePremiere(data);
        res.status(201).json({
            message : "Matière Premier est créé avac succès",
            data:nouvelleMatiere
        })
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
};

module.exports = {
    creer
};
