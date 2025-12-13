const express = require('express');
const router = express.Router();

// Importar versiones de ruta 
const V1Routes = require('./V1');

//Configurar rutas mencionadas
router.use('/v1', V1Routes);

// Ruta base para la version de la API
router.get('/', (req, res) => {
    res.json({
        "message": "Workout Tracker API",
        "versions": ["v1"],
        "endpoints": {
        "v1": "/api/v1"
    }
})
})

module.exports = router;