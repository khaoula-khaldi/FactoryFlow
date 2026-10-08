const mongoose=require("mongoose");

const MouvementStock = new mongoose.Schema({
    quantite: {
        type: Number,
        required: true,
        min: 0.01
    },

    stockeActuelle: {
        type: Number,
        required: true,
        min: 0
    },

    date: {
        type: Date,
        required: true
    }

});

module.exports = mongoose.model("MouvementStock", MouvementStock);