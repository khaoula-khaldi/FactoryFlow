const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const mouvementStockController = require("../controllers/mouvementStockController");

router.use(authMiddleware, adminMiddleware);

router.post("/", mouvementStockController.creer);
router.get("/", mouvementStockController.obtenirTous);
router.get("/matiere/:matierePremiereId", mouvementStockController.obtenirParMatierePremiere);
router.get("/:id", mouvementStockController.obtenirParId);
router.get( "/stock/:matierePremiereId", authMiddleware, adminMiddleware, mouvementStockController.obtenirStockActuel);

module.exports = router;
