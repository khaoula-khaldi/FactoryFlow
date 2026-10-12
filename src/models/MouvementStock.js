
const mongoose = require("mongoose");

const MouvementStockSchema = new mongoose.Schema(
    {
        matierePremiereId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MatierePremiere",
            required: true
        },

        sens: {
            type: String,
            enum: ["ENTREE", "SORTIE"],
            required: true
        },

        quantite: {
            type: Number,
            required: true,
            min: 0.01
        },

        stockActuel: {
            type: Number,
            required: true,
            min: 0
        },

        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("MouvementStock",MouvementStockSchema);
