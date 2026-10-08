const mongoose = require("mongoose");

const UtilisateurSchema = new mongoose.Schema({

    nom: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true,
        enum: ["ADMIN", "OPERATEUR"]
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Utilisateur", UtilisateurSchema);