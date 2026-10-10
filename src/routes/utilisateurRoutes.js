const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const express = require("express");

const router = express.Router();

const utilisateurController = require("../controllers/utilisateurController");

router.post("/login", utilisateurController.login);

router.post(
    "/creeUser",
    authMiddleware,
    adminMiddleware,
    utilisateurController.creerUtilisateur
);

console.log(
    "Routes utilisateur:",
    router.stack
        .filter(r => r.route)
        .map(r => ({
            path: r.route.path,
            methods: r.route.methods
        }))
);

module.exports = router;