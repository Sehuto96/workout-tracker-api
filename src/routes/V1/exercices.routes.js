const express = require('express');
const {
getAllExercises,
getExerciseById,
createExercise,
updateExercise,
partialUpdateExercise,
deleteExercise
} = require('../../controllers/exercises.controller');
const router = express.Router();
// GET
router.get('/', getAllExercises);
router.get('/:id', getExerciseById);
// Declaración de rutas futuras
router.post('/', createExercise);
router.put('/:id', updateExercise);
router.patch('/:id', partialUpdateExercise);
router.delete('/:id', deleteExercise);
module.exports = router;