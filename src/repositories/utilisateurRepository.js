const Utilisateur = require("../models/Utilisateur");

const findByEmail = async (email) => {
    return await Utilisateur.findOne({ email });
};

const findById = async (id) => {
    return await Utilisateur.findById(id);
};

const findAdmin = async () => {
    return await Utilisateur.findOne({ role: "ADMIN" });
};

const createUser = async (data) => {
    return await Utilisateur.create(data);
};

module.exports = {
    findByEmail,
    findById,
    findAdmin,
    createUser
};