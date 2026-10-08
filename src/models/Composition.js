const mongoose = require("mongoose");

const CompositionSchema = new mongoose.Schema({
    produitId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"produit",
        trquired:true

    },
    MatierePremiereId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"MatierePremiere",
        required:true
    },
    quantite:{
        type:Number,
        required:true,
        min:0
    },
    
});

module.exports = mongoose.model("Composition",CompositionSchema);