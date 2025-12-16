const router = require("express").Router();
const ctrl = require("../controllers/Workout.controller");

/**
 * @openapi
 * tags:
 *   name: Workouts
 *   description: Gestion des programmes d'entraînement
 */

/**
 * @openapi
 * /api/workouts:
 *   get:
 *     summary: Récupérer tous les workouts
 *     description: Retourne la liste des workouts avec les exercices associés
 *     tags: [Workouts]
 *     responses:
 *       200:
 *         description: Liste des workouts récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Workout'
 *       500:
 *         description: Erreur serveur
 */
router.get("/", ctrl.getWorkout);

/**
 * @openapi
 * /api/workouts/{id}:
 *   get:
 *     summary: Récupérer un workout par ID
 *     description: Retourne les détails d'un workout spécifique avec ses exercices
 *     tags: [Workouts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du workout
 *     responses:
 *       200:
 *         description: Détails du workout récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       404:
 *         description: Workout non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", ctrl.getWorkoutById);

/**
 * @openapi
 * /api/workouts:
 *   post:
 *     summary: Créer un nouveau workout
 *     description: Crée un nouveau programme d'entraînement
 *     tags: [Workouts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkoutInput'
 *     responses:
 *       201:
 *         description: Workout créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/", ctrl.createWorkout);

/**
 * @openapi
 * /api/workouts/{id}:
 *   put:
 *     summary: Mettre à jour un workout
 *     description: Met à jour les informations d'un workout existant
 *     tags: [Workouts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du workout
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkoutInput'
 *     responses:
 *       200:
 *         description: Workout mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       404:
 *         description: Workout non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put("/:id", ctrl.updateWorkout);

/**
 * @openapi
 * /api/workouts/{id}:
 *   delete:
 *     summary: Supprimer un workout
 *     description: Supprime un workout de la base de données
 *     tags: [Workouts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du workout
 *     responses:
 *       200:
 *         description: Workout supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Workout deleted successfully"
 *       404:
 *         description: Workout non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", ctrl.deleteWorkout);

module.exports = router;
