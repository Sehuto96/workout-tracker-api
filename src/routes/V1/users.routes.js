const express = require('express');
const {
 getAllUsers,
 getUserById,
 createUser,
 updateUser,
 partialUpdateUser,
 deleteUser
} = require('../../controllers/users.controller');
const router = express.Router();
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.patch('/:id', partialUpdateUser);

//  RUTAS DELETE

// /
// * DELETE /api/v1/users/:id
// * Eliminar un usuario
// * */
router.delete('/:id', deleteUser);
module.exports = router;