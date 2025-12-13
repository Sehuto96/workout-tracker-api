const express = require('express');
const router = express.Router();

// Importar rutas específicas
const usersRoutes = require('./users.routes');


//Configurar las rutas 
router.use('/users', usersRoutes);

module.exports = router;



