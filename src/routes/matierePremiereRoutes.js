const express = require("express");

const router = express.Router()

const matierePremiereController = require("../controllers/matierePremiereController")
router.post("/", matierePremiereController.creer)
module.exports = router;
