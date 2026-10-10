
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const utilisateurRepository = require("../repositories/utilisateurRepository");

const login = async (email, password) => {
    const utilisateur = await utilisateurRepository.findByEmail(email);

    if (!utilisateur) {
        throw new Error("Email ou mot de passe incorrect");
    }

    const passwordCorrect = await bcrypt.compare(
        password,
        utilisateur.password
    );

    if (!passwordCorrect) {
        throw new Error("Email ou mot de passe incorrect");
    }

    const token = jwt.sign(
        {
            userId: utilisateur._id,
            role: utilisateur.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

 
    return {
        id: utilisateur._id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role,
        token
    };
};

const creerUtilisateur = async (nom, email, password, role) => {
    if (!nom) {
        throw new Error("Le nom est obligatoire");
    }

    if (!email) {
        throw new Error("L'email est obligatoire");
    }

    const utilisateurExistant = await utilisateurRepository.findByEmail(email);

    if (utilisateurExistant) {
        throw new Error("Cet email est déjà utilisé");
    }

    if (!password) {
        throw new Error("Le mot de passe est obligatoire");
    }

    if (!["ADMIN", "OPERATEUR"].includes(role)) {
        throw new Error("Le rôle doit être ADMIN ou OPERATEUR");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const nouvelUtilisateur = await utilisateurRepository.createUser({
        nom,
        email,
        password: passwordHash,
        role
    });

    return {
        id: nouvelUtilisateur._id,
        nom: nouvelUtilisateur.nom,
        email: nouvelUtilisateur.email,
        role: nouvelUtilisateur.role
    };
};

module.exports = {login,creerUtilisateur};