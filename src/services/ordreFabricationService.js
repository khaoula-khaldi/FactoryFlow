const OrdreFabricationRepository = require("../repositories/ordreFabricationRepository");
const CompositionRepository = require("../repositories/compositionRepository");
const DetailOrdreRepository = require("../repositories/detailOrdreRepository");
const MouvementStockService = require("../services/mouvementStockService");
const UserRepository = require("../repositories/utilisateurRepository");


const creerOrdreFabrication = async (data) => {
    const { produitId, quantite , operateurId } = data;

    if (!operateurId) {
        throw new Error("L'opérateur est obligatoire.");
    }

    const operateur = await UserRepository.findById(operateurId);

    if (!operateur) {
        throw new Error("Opérateur introuvable.");
    }

    if (operateur.role !== "OPERATEUR") {
        throw new Error("L'utilisateur sélectionné n'est pas un opérateur.");
    }

    if (!produitId) {
        throw new Error("Le produit est obligatoire.");
    }

    if(typeof quantite !=="number" || !Number.isFinite(quantite)|| quantite<=0){
        throw new Error("la quntité doit etre positive");
    }
    const composition =await CompositionRepository.findByProduitId(produitId);
    if(composition.length == 0){
        throw new Error ("ce produit n'a pas de composition")
    }
    const compositionSnapshot = composition.map((element)=>{
        return {
            matierePremiereId : element.matierePremiereId,
            quantiteMatiere : element.quantite * quantite
        }    
    });
    for (const element of compositionSnapshot) {
        const stockActuel = await MouvementStockService.calculerStockActuel(element.matierePremiereId);

        if (stockActuel < element.quantiteMatiere) {
            throw new Error(`Stock insuffisant pour la matière première ${element.matierePremiereId}`);
        }
    }
    const numeroOrdre = `OF-${Date.now()}`;
    const dataOrdre = {
        numero: numeroOrdre,
        statut: "PLANIFIE",
        operateurId,
        compositionSnapshot
    };

    const ordre = await OrdreFabricationRepository.createOrdre(dataOrdre);
    const dataDetail = {
        ordreFabricationId: ordre._id,
        produitId: produitId,
        quantite: quantite
    };
    const detail = await DetailOrdreRepository.createDetail(dataDetail);


    return {
        ordre,
        detail
    }

};

const obtenirOrdresParOperateur = async (operateurId) => {
    return await OrdreFabricationRepository.findByOperateurId(operateurId);
};


const demarrerOrdreFabrication = async (id, userId, role) => {
    const ordre = await OrdreFabricationRepository.findById(id);

    if (!ordre) {
        throw new Error("Ordre de fabrication introuvable.");
    }

    if (ordre.statut !== "PLANIFIE") {
        throw new Error("Cet ordre ne peut pas être démarré.");
    }
    verifierAccesOrdre(ordre, userId, role);
    for (const element of ordre.compositionSnapshot) {
        const stockActuel =await MouvementStockService.calculerStockActuel(element.matierePremiereId);

        if (stockActuel < element.quantiteMatiere) {
            throw new Error(
                `Stock insuffisant pour la matière première ${element.matierePremiereId}`
            );
        }
    }

    for (const element of ordre.compositionSnapshot) {
        await MouvementStockService.creerMouvement({
            matierePremiereId: element.matierePremiereId,
            sens: "SORTIE",
            quantite: element.quantiteMatiere
        });
    }

    const ordreMisAJour =await OrdreFabricationRepository.updateOrdre(id, {
                                                                            statut: "EN_COURS",
                                                                            dateDemarrage: new Date()
                                                                        });

    return ordreMisAJour;
};


const terminerOrdreFabrication = async (id) => {
    const ordre = await OrdreFabricationRepository.findById(id);

    if (!ordre) {
        throw new Error("Ordre de fabrication introuvable.");
    }

    if (ordre.statut !== "EN_COURS") {
        throw new Error(
            "Seul un ordre en cours peut être terminé."
        );
    }

    const ordreMisAJour =await OrdreFabricationRepository.updateOrdre(id, {
                                                                                statut: "TERMINE",
                                                                                dateFin: new Date()
                                                                            });

    return ordreMisAJour;
};


const annulerOrdreFabrication = async (id) => {
    const ordre = await OrdreFabricationRepository.findById(id);

    if (!ordre) {
        throw new Error("Ordre de fabrication introuvable.");
    }

    if (ordre.statut !== "PLANIFIE") {
        throw new Error(
            "Seul un ordre planifié peut être annulé."
        );
    }

    const ordreAnnule =await OrdreFabricationRepository.updateOrdre(id, {statut: "ANNULE"});

    return ordreAnnule;
};


const obtenirTousLesOrdres = async () => {
    return await OrdreFabricationRepository.findAll();
};


const obtenirOrdreParId = async (id) => {
    const ordre = await OrdreFabricationRepository.findById(id);

    if (!ordre) {
        throw new Error("Ordre de fabrication introuvable.");
    }

    const details = await DetailOrdreRepository.findByOrdreFabricationId(id);

    return {
        ordre,
        details
    };
};
const verifierAccesOrdre = (ordre, userId, role) => {
    console.log("User connecté :", userId);
    console.log("Opérateur assigné :", ordre.operateurId);
    console.log("Role :", role);

    if (
        role !== "ADMIN" &&
        ordre.operateurId.toString() !== userId.toString()
    ) {
        throw new Error("Cet ordre ne vous est pas assigné.");
    }
};
module.exports = {
    creerOrdreFabrication,
    obtenirOrdresParOperateur,
    demarrerOrdreFabrication,
    terminerOrdreFabrication,
    annulerOrdreFabrication,
    obtenirTousLesOrdres,
    obtenirOrdreParId,
    verifierAccesOrdre
}