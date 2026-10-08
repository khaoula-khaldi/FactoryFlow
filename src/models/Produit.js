const mongoose = require("mongoose");

const ProduitSchema = new mongoose.Schema({

    reference: {
        type: String,
        required: true,
        unique: true
    },

    nom: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Produit", ProduitSchema);