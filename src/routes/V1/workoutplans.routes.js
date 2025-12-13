const express = require('express');
const {
getAllWorkoutPlans,
getWorkoutPlanById,
} = require('../../controllers/workoutplans.controller');
const router = express.Router();
// RUTAS GET (solo estas por ahora)
router.get('/', getAllWorkoutPlans);
router.get('/:id', getWorkoutPlanById);
module.exports = router;