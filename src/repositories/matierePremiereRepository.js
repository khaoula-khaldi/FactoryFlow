
const MatierePremiere = require("../models/MatierePremiere");


const createMatierePremiere = async (data) => {
    return await MatierePremiere.create(data);
};


const findAll = async () => {
    return await MatierePremiere.find({});
};


const findById = async (id) => {
    return await MatierePremiere.findById(id);
};


const findByReference = async (reference) => {
    return await MatierePremiere.findOne({ reference });
};


const updateMatierePremiere = async (id, data) => {
    return await MatierePremiere.updateOne(
        { _id: id },
        { $set: data }
    );
};


const deleteMatierePremiere = async (id) => {
    return await MatierePremiere.deleteOne({ _id: id });
};

module.exports = {
    createMatierePremiere,
    findAll,
    findById,
    findByReference,
    updateMatierePremiere,
    deleteMatierePremiere
};