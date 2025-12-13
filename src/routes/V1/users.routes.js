const express = require('express');
const {
getAllUsers,
getUserById
} = require('../../controllers/user.controller');
const router = express.Router();

//  RUTAS GET DE USERS

// /
// * GET /api/v1/users
// * Obtener lista de usuarios con filtros opcionales
// */
// router.get('/', getAllUsers);
// /
// * GET /api/v1/users/:id
// * Obtener un usuario por ID
// */
router.get('/:id', getUserById);
module.exports = router;