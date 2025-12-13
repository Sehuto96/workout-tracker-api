
const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser
} = require('../../controllers/users.controller');
const router = express.Router();

// RUTAS GET DE USERS
router.get('/', getAllUsers);
router.get('/:id', getUserById);

// RUTAS POST DE USERS
// * POST /api/v1/users
// * Crear un nuevo usuario
router.post('/', createUser);

module.exports = router;
