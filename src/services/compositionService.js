const CompositionRepository = require("../repositories/compositionRepository");
const Produit = require("../models/Produit");
const MatierePremiere = require("../models/MatierePremiere");

const creerComposition = async (data) => {
    const produit = await Produit.findById(data.produitId);
    if (!produit) {
        throw new Error("Produit introuvable.");
    }
    const matierePremiere = await MatierePremiere.findById(data.matierePremiereId);

    if (!matierePremiere) {
        throw new Error("Matière première introuvable.");
    }
    const compositionExistante =await CompositionRepository.findByProduitAndMatiere(data.produitId,data.matierePremiereId);

    if (compositionExistante) {
        throw new Error(
            "Cette matière première existe déjà dans la composition de ce produit."
        );
    }

    return await CompositionRepository.createComposition(data);
};

const obtenirToutes = async () => {
    return await CompositionRepository.findAll();
};

const obtenirParId = async (id) => {
    const composition = await CompositionRepository.findById(id);
    if (!composition) {
        throw new Error("Composition introuvable.");
    }
    return composition;
};

const obtenirParProduit = async (produitId) => {
    const produit = await Produit.findById(produitId);
    if (!produit) {
        throw new Error("Produit introuvable.");
    }
    return await CompositionRepository.findByProduitId(produitId);
};

const modifierComposition = async (id, data) => {
    const composition = await CompositionRepository.findById(id);
    if (!composition) {
        throw new Error("Composition introuvable.");
    }
    const produitId = data.produitId || composition.produitId;
    const matierePremiereId =data.matierePremiereId || composition.matierePremiereId;

    if (data.produitId) {
        const produit = await Produit.findById(data.produitId);
        if (!produit) {
            throw new Error("Produit introuvable.");
        }
    }
    if (data.matierePremiereId) {
        const matierePremiere = await MatierePremiere.findById(
            data.matierePremiereId
        );
        if (!matierePremiere) {
            throw new Error("Matière première introuvable.");
        }
    }
    const doublon =await CompositionRepository.findByProduitAndMatiere(produitId,matierePremiereId);
    if (doublon && doublon._id.toString() !== id) {
        throw new Error("Cette matière première existe déjà dans la composition de ce produit.");
    }
    return await CompositionRepository.updateComposition(id, data);
};


const supprimerComposition = async (id) => {
    const composition = await CompositionRepository.findById(id);
    if (!composition) {
        throw new Error("Composition introuvable.");
    }
    await CompositionRepository.deleteComposition(id);
    return {message: "Composition supprimée avec succès."};
};

module.exports = {
    creerComposition,
    obtenirToutes,
    obtenirParId,
    obtenirParProduit,
    modifierComposition,
    supprimerComposition
};