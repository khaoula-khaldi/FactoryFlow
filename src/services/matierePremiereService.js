
const matierePremiereRepository = require("../repositories/matierePremiereRepository");

const creerMatierePremiere = async (data) => {
    const matiereExistante =await matierePremiereRepository.findByReference(data.reference);
    if (matiereExistante) {
        throw new Error("Cette référence existe déjà.");
    }
    const nouvelleMatiere =await matierePremiereRepository.createMatierePremiere(data);
    return nouvelleMatiere;
};

const obtenirToutes = async () => {
    const matieres = await matierePremiereRepository.findAll();
    return matieres;
};


const obtenirParId = async (id) => {
    const matiere = await matierePremiereRepository.findById(id);
    if (!matiere) {
        throw new Error("Matière première introuvable.");
    }
    return matiere;
};


const modifierMatierePremiere = async (id, data) => {
    const matiere = await matierePremiereRepository.findById(id);
    if (!matiere) {
        throw new Error("Matière première introuvable.");
    }
    if (data.reference) {
        const matiereExistante =await matierePremiereRepository.findByReference(data.reference);
        if (matiereExistante && matiereExistante._id.toString() !== id) {
            throw new Error("Cette référence est déjà utilisée.");
        }
    }
    const resultat = await matierePremiereRepository.updateMatierePremiere(id, data);
    return resultat;
};


const supprimerMatierePremiere = async (id) => {
    const matiere = await matierePremiereRepository.findById(id);
    if (!matiere) {
        throw new Error("Matière première introuvable.");
    }
    await matierePremiereRepository.deleteMatierePremiere(id);
    return {message: "Matière première supprimée avec succès."};
};


module.exports = {
    creerMatierePremiere,
    obtenirToutes,
    obtenirParId,
    modifierMatierePremiere,
    supprimerMatierePremiere
};
