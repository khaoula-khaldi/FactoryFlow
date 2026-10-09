
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const utilisateurRepository = require("../repositories/utilisateurRepository");

const login = async (email, password) => {
    // 1. Chercher l'utilisateur par email
    const utilisateur = await utilisateurRepository.findByEmail(email);

    if (!utilisateur) {
        throw new Error("Email ou mot de passe incorrect");
    }

    // 2. Vérifier le mot de passe
    const passwordCorrect = await bcrypt.compare(
        password,
        utilisateur.password
    );

    if (!passwordCorrect) {
        throw new Error("Email ou mot de passe incorrect");
    }

    // 3. Créer le token JWT
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

    // 4. Retourner les informations utiles
    return {
        id: utilisateur._id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role,
        token
    };
};

module.exports = {
    login
};