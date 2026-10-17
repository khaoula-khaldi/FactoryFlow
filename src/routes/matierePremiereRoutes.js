
const express = require("express");
const router = express.Router();

const matierePremiereController = require("../controllers/matierePremiereController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.use(authMiddleware, adminMiddleware);

/**
 * @swagger
 * tags:
 *   name: Matières premières
 *   description: Gestion des matières premières
 */

/**
 * @swagger
 * /api/matieres-premieres:
 *   post:
 *     summary: Créer une matière première
 *     tags: [Matières premières]
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
 *               - uniteMesure
 *               - seuilAlerte
 *             properties:
 *               reference:
 *                 type: string
 *                 example: "MP-001"
 *               nom:
 *                 type: string
 *                 example: "Farine"
 *               uniteMesure:
 *                 type: string
 *                 example: "kg"
 *               seuilAlerte:
 *                 type: number
 *                 minimum: 0
 *                 example: 10
 *     responses:
 *       201:
 *         description: Matière première créée avec succès
 *       400:
 *         description: Données invalides ou référence déjà existante
 *       401:
 *         description: Authentification requise
 *       403:
 *         description: Accès réservé aux administrateurs
 */
router.post("/", matierePremiereController.creer);

/**
 * @swagger
 * /api/matieres-premieres:
 *   get:
 *     summary: Récupérer toutes les matières premières
 *     tags: [Matières premières]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des matières premières
 *       401:
 *         description: Authentification requise
 *       403:
 *         description: Accès réservé aux administrateurs
 */
router.get("/", matierePremiereController.obtenirToutes);

/**
 * @swagger
 * /api/matieres-premieres/{id}:
 *   get:
 *     summary: Récupérer une matière première par son ID
 *     tags: [Matières premières]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la matière première
 *     responses:
 *       200:
 *         description: Matière première trouvée
 *       400:
 *         description: Identifiant invalide
 *       401:
 *         description: Authentification requise
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Matière première introuvable
 */
router.get("/:id", matierePremiereController.obtenirParId);

/**
 * @swagger
 * /api/matieres-premieres/{id}:
 *   put:
 *     summary: Modifier une matière première
 *     tags: [Matières premières]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la matière première
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reference:
 *                 type: string
 *                 example: "MP-002"
 *               nom:
 *                 type: string
 *                 example: "Sucre"
 *               uniteMesure:
 *                 type: string
 *                 example: "kg"
 *               seuilAlerte:
 *                 type: number
 *                 minimum: 0
 *                 example: 15
 *     responses:
 *       200:
 *         description: Matière première modifiée avec succès
 *       400:
 *         description: Données invalides ou référence déjà utilisée
 *       401:
 *         description: Authentification requise
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Matière première introuvable
 */
router.put("/:id", matierePremiereController.modifier);

/**
 * @swagger
 * /api/matieres-premieres/{id}:
 *   delete:
 *     summary: Supprimer une matière première
 *     tags: [Matières premières]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la matière première
 *     responses:
 *       200:
 *         description: Matière première supprimée avec succès
 *       400:
 *         description: Suppression impossible
 *       401:
 *         description: Authentification requise
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Matière première introuvable
 */
router.delete("/:id", matierePremiereController.supprimer);

module.exports = router;
