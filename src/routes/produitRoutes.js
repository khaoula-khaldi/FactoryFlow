const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const express = require("express");

const router = express.Router();
const ProduitController = require("../controllers/produitController");

router.post('/',authMiddleware,adminMiddleware,ProduitController.creer);
router.get('/',authMiddleware,adminMiddleware,ProduitController.obtenirTous);
router.get('/:id',authMiddleware,adminMiddleware,ProduitController.obtenirParId);
router.put('/:id',authMiddleware,adminMiddleware,ProduitController.modifier);
router.delete('/:id',authMiddleware,adminMiddleware,ProduitController.supprimer);

module.exports = router;