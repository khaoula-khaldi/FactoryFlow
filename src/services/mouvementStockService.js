
const MouvementStockRepository = require("../repositories/mouvementStockRepository");
const MatierePremiere = require("../models/MatierePremiere");


const creerMouvement = async (data) => {
    const { matierePremiereId, sens, quantite } = data;

    const matierePremiere = await MatierePremiere.findById(matierePremiereId);

    if (!matierePremiere) {
        throw new Error("Cette matière première n'existe pas.");
    }

    if (!["ENTREE", "SORTIE"].includes(sens)) {
        throw new Error("Le sens doit être ENTREE ou SORTIE.");
    }

    if (typeof quantite !== "number" || !Number.isFinite(quantite) || quantite <= 0) {
        throw new Error("La quantité doit être un nombre positif.");
    }

    const stockActuel = await calculerStockActuel(matierePremiereId);
    console.log(stockActuel);

    if (sens === "SORTIE" && quantite > stockActuel) {
        throw new Error("Stock insuffisant pour effectuer cette sortie.");
    }

    let nouveauStockActuel;

    if (sens === "ENTREE") {
        nouveauStockActuel = quantite;
    } else {
        nouveauStockActuel = 0;
    }

    return await MouvementStockRepository.createMouvement({
        matierePremiereId,
        sens,
        quantite,
        stockActuel: nouveauStockActuel
    });
};

const calculerStockActuel = async (matierePremiereId) => {
    const mouvements =await MouvementStockRepository.findByMatierePremiereId(matierePremiereId);
    let stock = 0;

    for (const mouvement of mouvements) {
        if (mouvement.sens === "ENTREE") {
            stock += mouvement.quantite;
        } else if (mouvement.sens === "SORTIE") {
            stock -= mouvement.quantite;
        }
    }

    return stock;
};

const obtenirTous = async () => {
    return await MouvementStockRepository.findAll();
};

const obtenirParId = async (id) => {
    return await MouvementStockRepository.findById(id);
};

const obtenirParMatierePremiere = async (matierePremiereId) => {
    const matierePremiere = await MatierePremiere.findById(matierePremiereId);

    if (!matierePremiere) {
        throw new Error("Cette matière première n'existe pas.");
    }

    return await MouvementStockRepository.findByMatierePremiereId(
        matierePremiereId
    );
};

module.exports = {
    creerMouvement,
    obtenirTous,
    obtenirParId,
    obtenirParMatierePremiere,
    calculerStockActuel
};
