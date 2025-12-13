const express = require('express');
const {
getAllExercises,
getExerciseById,
} = require('../../controllers/exercises.controller');
const router = express.Router();
// RUTAS GET (solo estas por ahora)
router.get('/', getAllExercises);
router.get('/:id', getExerciseById);
module.exports = router;