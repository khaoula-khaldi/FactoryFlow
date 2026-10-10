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