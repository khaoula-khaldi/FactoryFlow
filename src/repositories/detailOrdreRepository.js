
const DetailOrdre = require("../models/DetailOrdre");

const createDetail = async (data) => {
    return await DetailOrdre.create(data);
};

const findAll = async () => {
    return await DetailOrdre.find({});
};

const findById = async (id) => {
    return await DetailOrdre.findById(id);
};

const findByOrdreFabricationId = async (ordreId) => {
    return await DetailOrdre.find({
        ordreFabricationId: ordreId
    });
};

const updateDetail = async (id, data) => {
    return await DetailOrdre.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: true }
    );
};

const deleteDetail = async (id) => {
    return await DetailOrdre.findByIdAndDelete(id);
};

module.exports = {
    createDetail,
    findAll,
    findById,
    findByOrdreFabricationId,
    updateDetail,
    deleteDetail
};
