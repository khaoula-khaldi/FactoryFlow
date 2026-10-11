const Produit = require("../models/Produit");
const createProduit = async (data)=>{
    return await Produit.create(data);
}
const findAll = async ()=>{
    return await Produit.find({});
}
const findById = async (id)=>{
    return await Produit.findById(id);
}
const findByReference = async (reference)=>{
    return await Produit.findOne({reference : reference});
}
const updateProduit = async (id,data)=>{
    return await Produit.updateOne(
        {_id:id},
        {$set : data}
    );
}

const deleteProduit = async (id)=>{
    return await Produit.deleteOne({_id : id});
}

module.exports = {
    createProduit,
    findAll,
    findById,
    findByReference,
    updateProduit,
    deleteProduit
}