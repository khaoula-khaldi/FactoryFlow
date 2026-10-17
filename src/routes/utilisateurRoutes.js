const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const express = require("express");

const router = express.Router();

const utilisateurController = require("../controllers/utilisateurController");

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connecter un utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@factoryflow.com
 *               password:
 *                 type: string
 *                 example: Admin123!
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Email ou mot de passe incorrect
 */
router.post("/login", utilisateurController.login);

/**
 * @swagger
 * /api/auth/creeUser:
 *   post:
 *     summary: Créer un utilisateur
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - email
 *               - password
 *               - role
 *             properties:
 *               nom:
 *                 type: string
 *                 example: Operateur 1
 *               email:
 *                 type: string
 *                 example: operateur1@factoryflow.com
 *               password:
 *                 type: string
 *                 example: Operateur123!
 *               role:
 *                 type: string
 *                 enum: [ADMIN, OPERATEUR]
 *                 example: OPERATEUR
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       401:
 *         description: Authentification requise ou token invalide
 *       403:
 *         description: Accès réservé à un administrateur
 */
router.post("/creeUser",authMiddleware,adminMiddleware,utilisateurController.creerUtilisateur);

module.exports = router;
