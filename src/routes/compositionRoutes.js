const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const compositionController = require("../controllers/compositionController");

router.use(authMiddleware, adminMiddleware);
router.post("/", compositionController.creer);
router.get("/", compositionController.obtenirToutes);
router.get("/produit/:produitId", compositionController.obtenirParProduit);
router.get("/:id", compositionController.obtenirParId);
router.put("/:id", compositionController.modifier);
router.delete("/:id", compositionController.supprimer);

module.exports = router;