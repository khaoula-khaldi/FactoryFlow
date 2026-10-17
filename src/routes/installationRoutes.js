
const express = require("express");
const router = express.Router();

const installationController = require("../controllers/installationController");

/**
 * @swagger
 * tags:
 *   name: Installation
 *   description: Installation initiale de FactoryFlow
 */

/**
 * @swagger
 * /api/install:
 *   post:
 *     summary: Installer l'application et créer le premier administrateur
 *     tags: [Installation]
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
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Admin FactoryFlow"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "admin@factoryflow.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Admin12345"
 *     responses:
 *       201:
 *         description: Application installée et administrateur créé
 *       400:
 *         description: Données invalides ou application déjà installée
 *       500:
 *         description: Erreur serveur
 */
router.post("/", installationController.install);

module.exports = router;
