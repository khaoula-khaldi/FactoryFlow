
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const mouvementStockController = require("../controllers/mouvementStockController");

/**
 * @swagger
 * tags:
 *   name: Mouvements de stock
 *   description: Gestion des entrées, sorties et consultation du stock
 */

/**
 * @swagger
 * /api/mouvement:
 *   post:
 *     summary: Créer un mouvement de stock
 *     tags: [Mouvements de stock]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - matierePremiereId
 *               - sens
 *               - quantite
 *             properties:
 *               matierePremiereId:
 *                 type: string
 *                 example: "671a12345678901234567890"
 *               sens:
 *                 type: string
 *                 enum: [ENTREE, SORTIE]
 *                 example: ENTREE
 *               quantite:
 *                 type: number
 *                 minimum: 0.01
 *                 example: 100
 *     responses:
 *       201:
 *         description: Mouvement créé avec succès
 *       400:
 *         description: Données invalides ou stock insuffisant
 *       401:
 *         description: Authentification requise
 *       403:
 *         description: Accès réservé aux administrateurs
 *       500:
 *         description: Erreur serveur
 */
router.post("/", authMiddleware, adminMiddleware, mouvementStockController.creer);

/**
 * @swagger
 * /api/mouvement:
 *   get:
 *     summary: Récupérer tous les mouvements de stock
 *     tags: [Mouvements de stock]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des mouvements de stock
 *       401:
 *         description: Authentification requise
 *       403:
 *         description: Accès réservé aux administrateurs
 */
router.get("/", authMiddleware, adminMiddleware, mouvementStockController.obtenirTous);

/**
 * @swagger
 * /api/mouvement/matiere/{matierePremiereId}:
 *   get:
 *     summary: Récupérer les mouvements d'une matière première
 *     tags: [Mouvements de stock]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: matierePremiereId
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la matière première
 *     responses:
 *       200:
 *         description: Liste des mouvements de cette matière première
 *       400:
 *         description: Identifiant invalide
 *       401:
 *         description: Authentification requise
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Matière première introuvable
 */
router.get(
    "/matiere/:matierePremiereId",
    authMiddleware,
    adminMiddleware,
    mouvementStockController.obtenirParMatierePremiere
);

/**
 * @swagger
 * /api/mouvement/stock/{matierePremiereId}:
 *   get:
 *     summary: Calculer le stock actuel d'une matière première
 *     tags: [Mouvements de stock]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: matierePremiereId
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la matière première
 *     responses:
 *       200:
 *         description: Stock actuel calculé à partir des entrées et sorties
 *       400:
 *         description: Identifiant invalide
 *       401:
 *         description: Authentification requise
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Matière première introuvable
 */
router.get(
    "/stock/:matierePremiereId",
    authMiddleware,
    adminMiddleware,
    mouvementStockController.obtenirStockActuel
);

/**
 * @swagger
 * /api/mouvement/{id}:
 *   get:
 *     summary: Récupérer un mouvement par son identifiant
 *     tags: [Mouvements de stock]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant du mouvement
 *     responses:
 *       200:
 *         description: Mouvement trouvé
 *       400:
 *         description: Identifiant invalide
 *       401:
 *         description: Authentification requise
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Mouvement introuvable
 */
router.get("/:id", authMiddleware, adminMiddleware, mouvementStockController.obtenirParId);

module.exports = router;
