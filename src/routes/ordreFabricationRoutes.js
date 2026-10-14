const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const ordreFabricationController = require("../controllers/ordreFabricationController");

router.post("/", authMiddleware, adminMiddleware, ordreFabricationController.creer);

router.get("/", authMiddleware, ordreFabricationController.obtenirTous);

router.get("/:id", authMiddleware, ordreFabricationController.obtenirParId);

    router.patch("/:id/demarrer", authMiddleware, ordreFabricationController.demarrer);

    router.patch("/:id/terminer", authMiddleware, ordreFabricationController.terminer);

    router.patch("/:id/annuler", authMiddleware, adminMiddleware, ordreFabricationController.annuler);

module.exports = router;
