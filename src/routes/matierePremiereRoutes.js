const express = require("express");

const router = express.Router();

const matierePremiereController = require("../controllers/matierePremiereController");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.use(authMiddleware, adminMiddleware);

router.post("/", matierePremiereController.creer);

router.get("/", matierePremiereController.obtenirToutes);

router.get("/:id", matierePremiereController.obtenirParId);

router.put("/:id", matierePremiereController.modifier);

router.delete("/:id", matierePremiereController.supprimer);

module.exports = router;
