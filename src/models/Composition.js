const mongoose = require("mongoose");

const CompositionSchema = new mongoose.Schema({
    produitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produit",
        required: true
    },
    matierePremiereId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MatierePremiere",
        required: true
    },
    quantite: {
        type: Number,
        required: true,
        min: 0.01
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Composition", CompositionSchema);