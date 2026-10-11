const produitService = require("../services/produitService");

const creer = async(req,res)=>{
    try{
        const data = req.body;
        const create = await produitService.creerProduit(data);
        return res.status(201).json({
            message : "produit create avec succès",
            create
        });
    }catch(error){
        return res.status(400).json({
            message : error.message
        });
    }
}
const obtenirTous = async(req,res)=>{
    try{ 
        const produit = await produitService.obtenirTous();
        return res.status(200).json({
            produit
        })
    }catch(error){
        return res.status(500).json({
            message : error.message
        })
    } 
}
const obtenirParId = async(req,res)=>{
    try{
        const id = req.params.id;
        const produit = await produitService.obtenirParId(id);
        return res.status(200).json({
            produit 
        })

    }catch(error){
        return res.status(404).json({
            message : error.message
        })
    }

}
const modifier = async(req,res)=>{
    try{
        const id = req.params.id;
        const data = req.body;
        const update = await produitService.modifierProduit(id,data);
        return res.status(200).json({
            message : "produit update avec succès",
            update
        })
    }catch(error){
        return res.status(404).json({
            message : error.message
        })
    }
}
const supprimer = async(req,res)=>{
    try{
        const id = req.params.id;
        const delet = await produitService.supprimerProduit(id);
        return res.status(200).json({
            message: "produit supprimé avec succès"
        })
    }catch(error){
        return res.status(400).json({
            message : error.message
        })
    }  
}

module.exports = {
    creer,
    obtenirTous,
    obtenirParId,
    modifier,
    supprimer
}