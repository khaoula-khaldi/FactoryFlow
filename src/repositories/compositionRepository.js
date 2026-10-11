const Composition = require("../models/Composition");

const createComposition = async (data) => {
    return await Composition.create(data);
};

const findAll = async () => {
    return await Composition.find({});
};

const findById = async (id) => {
    return await Composition.findById(id);
};

const findByProduitId = async (produitId) => {
    return await Composition.find({ produitId: produitId });
};

const findByProduitAndMatiere = async (produitId, matierePremiereId) => {
    return await Composition.findOne({
        produitId: produitId,
        matierePremiereId: matierePremiereId
    });
};

const updateComposition = async (id, data) => {
    return await Composition.updateOne(
        { _id: id },
        { $set: data }
    );
};

const deleteComposition = async (id) => {
    return await Composition.deleteOne({ _id: id });
};

module.exports = {
    createComposition,
    findAll,
    findById,
    findByProduitId,
    findByProduitAndMatiere,
    updateComposition,
    deleteComposition
};