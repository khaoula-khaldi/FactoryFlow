const bcrypt = require("bcrypt");

const installationRepository = require("../repositories/installationRepository");
const utilisateurRepository = require("../repositories/utilisateurRepository");

const install = async (userData) => {

    const installation = await installationRepository.findInstallation();

    if (installation && installation.installed) {
        throw new Error("Application déjà installée");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const admin = await utilisateurRepository.createUser({
        nom: userData.nom,
        email: userData.email,
        password: hashedPassword,
        role: "ADMIN"
    });

    await installationRepository.createInstallation({
        installed: true,
        dateInstallation: new Date()
    });

    return admin;
};

module.exports = {install};