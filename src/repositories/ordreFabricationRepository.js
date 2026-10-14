
const OrdreFabrication = require("../models/OrdreFabrication");

const createOrdre = async (data) => {
    return await OrdreFabrication.create(data);
};

const findAll = async () => {
    return await OrdreFabrication.find({});
};

const findById = async (id) => {
    return await OrdreFabrication.findById(id);
};

const findByNumero = async (numero) => {
    return await OrdreFabrication.findOne({ numero });
};

const findByOperateurId = async (operateurId) => {
    return await OrdreFabrication.find({ operateurId });
};

const updateOrdre = async (id, data) => {
    return await OrdreFabrication.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: true }
    );
};

module.exports = {
    createOrdre,
    findAll,
    findById,
    findByOperateurId,
    findByNumero,
    updateOrdre
};
