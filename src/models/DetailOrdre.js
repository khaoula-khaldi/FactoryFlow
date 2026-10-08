const DetailOrdreSchema = new mongoose.Schema({

    ordreFabricationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrdreFabrication",
        required: true
    },

    produitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produit",
        required: true
    },

    quantite: {
        type: Number,
        required: true,
        min: 0.01
    }

});

module.exports = mongoose.model("DetailOrdre", DetailOrdreSchema);