const mongoose = require("mongoose");

const MatierePremiereSchema = new mongoose.Schema({

    reference: {
        type: String,
        required: true,
        unique: true
    },

    nom: {
        type: String,
        required: true
    },

    uniteMesure: {
        type: String,
        required: true
    },

    seuilAlerte: {
        type: Number,
        required: true,
        min: 0
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("MatierePremiere", MatierePremiereSchema);