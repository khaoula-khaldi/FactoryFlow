
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const ordreFabricationController = require("../controllers/ordreFabricationController");
/**
 * @swagger
 * tags:
 *   name: Ordres de fabrication
 *   description: la gestion des orders de fabrication
 */

/**
 * @swagger
 * /api/ordres-fabrication:
 *   post:
 *     summary: Créer un ordre de fabrication
 *     tags: [Ordres de fabrication]
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
 *               - quantite
 *               - operateurId
 *             properties:
 *               produitId:
 *                 type: string
 *                 description: Identifiant du produit à fabriquer
 *                 example: 6acd416c6bc60bc7a84bbeb6
 *               quantite:
 *                 type: number
 *                 minimum: 1
 *                 description: Quantité de produits à fabriquer
 *                 example: 40
 *               operateurId:
 *                 type: string
 *                 description: Identifiant de l'opérateur assigné
 *                 example: 6ad39512ad36c4e4fed2433d
 *     responses:
 *       201:
 *         description: Ordre de fabrication créé avec succès
 *       400:
 *         description: Données invalides ou stock insuffisant
 *       401:
 *         description: Authentification requise ou token invalide
 *       403:
 *         description: Accès réservé à un administrateur
 *       404:
 *         description: Produit ou opérateur introuvable
 */
router.post("/", authMiddleware, adminMiddleware, ordreFabricationController.creer);

/**
 * @swagger
 * /api/ordres-fabrication:
 *   get:
 *     summary: Récupérer tous les ordres de fabrication
 *     tags: [Ordres de fabrication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des ordres de fabrication récupérée avec succès
 *       401:
 *         description: Authentification requise ou token invalide
 */
router.get("/", authMiddleware, ordreFabricationController.obtenirTous);

/**
 * @swagger
 * /api/ordres-fabrication/{id}:
 *   get:
 *     summary: Récupérer un ordre de fabrication par son ID
 *     tags: [Ordres de fabrication]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de l'ordre de fabrication
 *     responses:
 *       200:
 *         description: Ordre de fabrication récupéré avec succès
 *       400:
 *         description: Identifiant invalide
 *       401:
 *         description: Authentification requise ou token invalide
 *       404:
 *         description: Ordre de fabrication introuvable
 */
router.get("/:id", authMiddleware, ordreFabricationController.obtenirParId);

/**
 * @swagger
 * /api/ordres-fabrication/{id}/demarrer:
 *   patch:
 *     summary: Démarrer un ordre de fabrication
 *     tags: [Ordres de fabrication]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de l'ordre à démarrer
 *     responses:
 *       200:
 *         description: Ordre de fabrication démarré avec succès
 *       400:
 *         description: Transition de statut impossible ou stock insuffisant
 *       401:
 *         description: Authentification requise ou token invalide
 *       403:
 *         description: Accès non autorisé pour cet utilisateur
 *       404:
 *         description: Ordre de fabrication introuvable
 */
router.patch("/:id/demarrer", authMiddleware, ordreFabricationController.demarrer);

/**
 * @swagger
 * /api/ordres-fabrication/{id}/terminer:
 *   patch:
 *     summary: Terminer un ordre de fabrication
 *     tags: [Ordres de fabrication]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de l'ordre à terminer
 *     responses:
 *       200:
 *         description: Ordre de fabrication terminé avec succès
 *       400:
 *         description: Transition de statut impossible
 *       401:
 *         description: Authentification requise ou token invalide
 *       403:
 *         description: Accès non autorisé pour cet utilisateur
 *       404:
 *         description: Ordre de fabrication introuvable
 */
router.patch("/:id/terminer", authMiddleware, ordreFabricationController.terminer);

/**
 * @swagger
 * /api/ordres-fabrication/{id}/annuler:
 *   patch:
 *     summary: Annuler un ordre de fabrication
 *     tags: [Ordres de fabrication]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de l'ordre à annuler
 *     responses:
 *       200:
 *         description: Ordre de fabrication annulé avec succès
 *       400:
 *         description: Annulation impossible pour le statut actuel
 *       401:
 *         description: Authentification requise ou token invalide
 *       403:
 *         description: Accès réservé à un administrateur
 *       404:
 *         description: Ordre de fabrication introuvable
 */
router.patch("/:id/annuler", authMiddleware, adminMiddleware, ordreFabricationController.annuler);

module.exports = router;
