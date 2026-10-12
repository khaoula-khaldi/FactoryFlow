const MouvementStock = require("../models/MouvementStock");

const createMouvement = async (data) => {
    return await MouvementStock.create(data);
};


const findAll = async () => {
    return await MouvementStock.find().sort({ date: -1, _id: -1 });
};


const findById = async (id) => {
    return await MouvementStock.findById(id);
};

const findByMatierePremiereId = async (matierePremiereId) => {
    return await MouvementStock.find({ matierePremiereId }).sort({ date: -1, _id: -1 });
};

module.exports = {
    createMouvement,
    findAll,
    findById,
    findByMatierePremiereId
};
