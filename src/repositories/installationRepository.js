const Installation = require("../models/Installation");

const findInstallation = async () => {
    return await Installation.findOne();
};

const createInstallation = async (data) => {
    return await Installation.create(data);
};

module.exports = {
    findInstallation,
    createInstallation
};