const express = require('express');
const router = express.Router();

// Importar routers por recurso
const usersRoutes = require('./users.routes');
const exercisesRoutes = require('./exercises.routes');
const workoutplannRoutes = require('./workoutplans.routes');

// Montar rutas por versión
router.use('/users', usersRoutes);
router.use('/exercises', exercisesRoutes);
router.use('/workoutplans', workoutplannRoutes);

module.exports = router;
