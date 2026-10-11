const ProduitRepository = require("../repositories/produitRepository");

const creerProduit = async (data) => {
    const produitReference = await ProduitRepository.findByReference(data.reference);

    if (produitReference) {
        throw new Error("Cette référence existe déjà.");
    }
    const produitCreate = await ProduitRepository.createProduit(data);
    return produitCreate;

};

const obtenirTous = async () => {
    const toutProduit = await ProduitRepository.findAll();
    return toutProduit;
};

const obtenirParId =async (id)=>{
    const produit = await ProduitRepository.findById(id);
    if(!produit){
        throw new Error("produit introuvable");
    }
    return produit;
}

const modifierProduit = async (id,data)=>{
    const produitExistant = await ProduitRepository.findById(id);
    if(!produitExistant){
        throw new Error("produit introuvable");
    }
    if(data.reference){
        const produitReference = await ProduitRepository.findByReference(data.reference);
        if(produitReference && produitReference._id.toString()!==id){
            throw new Error("cette reference est deja utilisé");
        }
    }    
    const produitModifier = await ProduitRepository.updateProduit(id,data);
    return produitModifier;
}

const supprimerProduit = async (id) =>{
    const produitExistant = await ProduitRepository.findById(id);
    if(!produitExistant){
        throw new Error("produit introuvable");
    } 
    const deletProduit = await ProduitRepository.deleteProduit(id);
    return { message: "Produit supprimé avec succès." }; ; 
    
}
module.exports = {
    creerProduit,
    obtenirTous,
    obtenirParId,
    modifierProduit,
    supprimerProduit
}