
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const compositionController = require("../controllers/compositionController");

router.use(authMiddleware, adminMiddleware);

/**
 * @swagger
 * tags:
 *   name: Compositions
 *   description: Gestion des compositions des produits
 */

/**
 * @swagger
 * /api/compositions:
 *   post:
 *     summary: Ajouter une matière première à la composition d'un produit
 *     tags: [Compositions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - produitId
 *               - matierePremiereId
 *               - quantite
 *             properties:
 *               produitId:
 *                 type: string
 *                 example: "671a12345678901234567890"
 *               matierePremiereId:
 *                 type: string
 *                 example: "671b12345678901234567890"
 *               quantite:
 *                 type: number
 *                 minimum: 0.01
 *                 example: 2.5
 *     responses:
 *       201:
 *         description: Composition créée avec succès
 *       400:
 *         description: Données invalides ou composition déjà existante
 *       401:
 *         description: Authentification requise
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Produit ou matière première introuvable
 */
router.post("/", compositionController.creer);

/**
 * @swagger
 * /api/compositions:
 *   get:
 *     summary: Récupérer toutes les compositions
 *     tags: [Compositions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des compositions
 *       401:
 *         description: Authentification requise
 *       403:
 *         description: Accès réservé aux administrateurs
 */
router.get("/", compositionController.obtenirToutes);

/**
 * @swagger
 * /api/compositions/produit/{produitId}:
 *   get:
 *     summary: Récupérer la composition d'un produit
 *     tags: [Compositions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: produitId
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant du produit
 *     responses:
 *       200:
 *         description: Composition du produit récupérée
 *       400:
 *         description: Identifiant invalide
 *       401:
 *         description: Authentification requise
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Produit introuvable
 */
router.get("/produit/:produitId", compositionController.obtenirParProduit);

/**
 * @swagger
 * /api/compositions/{id}:
 *   get:
 *     summary: Récupérer une composition par son ID
 *     tags: [Compositions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la composition
 *     responses:
 *       200:
 *         description: Composition trouvée
 *       400:
 *         description: Identifiant invalide
 *       401:
 *         description: Authentification requise
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Composition introuvable
 */
router.get("/:id", compositionController.obtenirParId);

/**
 * @swagger
 * /api/compositions/{id}:
 *   put:
 *     summary: Modifier une composition
 *     tags: [Compositions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la composition
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               produitId:
 *                 type: string
 *                 example: "671a12345678901234567890"
 *               matierePremiereId:
 *                 type: string
 *                 example: "671b12345678901234567890"
 *               quantite:
 *                 type: number
 *                 minimum: 0.01
 *                 example: 3
 *     responses:
 *       200:
 *         description: Composition modifiée avec succès
 *       400:
 *         description: Données invalides ou doublon
 *       401:
 *         description: Authentification requise
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Composition, produit ou matière première introuvable
 */
router.put("/:id", compositionController.modifier);

/**
 * @swagger
 * /api/compositions/{id}:
 *   delete:
 *     summary: Supprimer une composition
 *     tags: [Compositions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la composition
 *     responses:
 *       200:
 *         description: Composition supprimée avec succès
 *       400:
 *         description: Suppression impossible
 *       401:
 *         description: Authentification requise
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Composition introuvable
 */
router.delete("/:id", compositionController.supprimer);

module.exports = router;
