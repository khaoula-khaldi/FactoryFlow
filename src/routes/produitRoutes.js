const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const express = require("express");

const router = express.Router();
const ProduitController = require("../controllers/produitController");

/**
 * @swagger
 * /api/produits:
 *   post:
 *     summary: Créer un nouveau produit
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reference
 *               - nom
 *               - description
 *             properties:
 *               reference:
 *                 type: string
 *                 example: PROD-001
 *               nom:
 *                 type: string
 *                 example: Produit A
 *               description:
 *                 type: string
 *                 example: Un produit destiné à la fabrication industrielle
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *       400:
 *         description: Données invalides ou référence déjà utilisée
 *       401:
 *         description: Authentification requise ou token invalide
 *       403:
 *         description: Accès réservé à un administrateur
 */

router.post("/", authMiddleware, adminMiddleware, ProduitController.creer);

/**
 * @swagger
 * /api/produits:
 *   get:
 *     summary: Récupérer tous les produits
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des produits récupérée avec succès
 *       401:
 *         description: Authentification requise ou token invalide
 *       403:
 *         description: Accès réservé à un administrateur
 */
router.get("/", authMiddleware, adminMiddleware, ProduitController.obtenirTous);

/**
 * @swagger
 * /api/produits/{id}:
 *   get:
 *     summary: Récupérer un produit par son ID
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant du produit
 *     responses:
 *       200:
 *         description: Produit récupéré avec succès
 *       400:
 *         description: Identifiant invalide
 *       401:
 *         description: Authentification requise ou token invalide
 *       403:
 *         description: Accès réservé à un administrateur
 *       404:
 *         description: Produit introuvable
 */
router.get("/:id", authMiddleware, adminMiddleware, ProduitController.obtenirParId);

/**
 * @swagger
 * /api/produits/{id}:
 *   put:
 *     summary: Modifier un produit
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant du produit à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reference:
 *                 type: string
 *                 example: PROD-002
 *               nom:
 *                 type: string
 *                 example: Produit modifié
 *     responses:
 *       200:
 *         description: Produit modifié avec succès
 *       400:
 *         description: Données invalides ou référence déjà utilisée
 *       401:
 *         description: Authentification requise ou token invalide
 *       403:
 *         description: Accès réservé à un administrateur
 *       404:
 *         description: Produit introuvable
 */
router.put("/:id", authMiddleware, adminMiddleware, ProduitController.modifier);

/**
 * @swagger
 * /api/produits/{id}:
 *   delete:
 *     summary: Supprimer un produit
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant du produit à supprimer
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès
 *       400:
 *         description: Identifiant invalide
 *       401:
 *         description: Authentification requise ou token invalide
 *       403:
 *         description: Accès réservé à un administrateur
 *       404:
 *         description: Produit introuvable
 */
router.delete("/:id", authMiddleware, adminMiddleware, ProduitController.supprimer);

module.exports = router;
