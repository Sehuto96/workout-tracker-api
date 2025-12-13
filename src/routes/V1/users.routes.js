
const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  partialUpdateUser
} = require('../../controllers/users.controller');
const router = express.Router();

// RUTAS GET DE USERS
router.get('/', getAllUsers);
router.get('/:id', getUserById);

// RUTAS POST DE USERS
// * POST /api/v1/users
// * Crear un nuevo usuario
router.post('/', createUser);

// RUTAS PUT Y PATCH

// /
// * PUT /api/v1/users/:id
// * Actualizar usuario completamente
// */
router.put('/:id', updateUser);

// /
// * PATCH /api/v1/users/:id
// * Actualizar usuario parcialmente
// */
router.patch('/:id', partialUpdateUser);

module.exports = router;
