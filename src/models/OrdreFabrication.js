const mongoose = require("mongoose");

const CompositionSnapshotSchema = new mongoose.Schema({
    matierePremiereId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MatierePremiere",
        required: true
    },

    quantiteMatiere: {
        type: Number,
        required: true,
        min: 0.01
    }
});

const OrdreFabricationSchema = new mongoose.Schema({

    numero: {
        type: String,
        required: true,
        unique: true
    },

    statut: {
        type: String,
        enum: ["PLANIFIE", "EN_COURS", "TERMINE", "ANNULE"],
        required: true
    },

    compositionSnapshot: {
        type: [CompositionSnapshotSchema],
        required: true
    },

    dateCreation: {
        type: Date,
        default: Date.now
    },

    dateDemarrage: {
        type: Date
    },

    dateFin: {
        type: Date
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("OrdreFabrication", OrdreFabricationSchema);