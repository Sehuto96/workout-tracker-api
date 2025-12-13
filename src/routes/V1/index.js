
const express = require('express');
const router = express.Router();

// Importamos las funciones del controlador
const {
    getAllExercises,
    getExerciseById,
    createExercise,
    updateExercise,
    partialUpdateExercise,
    deleteExercise
} = require('../../controllers/exercises.controller'); // ✅ corregido el nombre del archivo

// Definición de rutas REST
router.get('/', getAllExercises);            // Obtener todos los ejercicios
router.get('/:id', getExerciseById);         // Obtener un ejercicio por ID
router.post('/', createExercise);            // Crear un nuevo ejercicio
router.put('/:id', updateExercise);          // Actualizar un ejercicio completo
router.patch('/:id', partialUpdateExercise); // Actualización parcial
router.delete('/:id', deleteExercise);       // Eliminar un ejercicio

module.exports = router;
