// ESTADO EN MEMORIA

let users = [
 {
 id: 'b42f53fa-7b30-4b91-8d36-dc1c6ef27611',
 name: 'Carlos Navia',
 email: 'carlos@example.com',
 role: 'admin',
 createdAt: '2025-09-12T12:00:00Z'
 },
 {
 id: 'a12f53fa-7b30-4b91-8d36-dc1c6ef27622',
 name: 'Ana Torres',
 email: 'ana@example.com',
 role: 'user',
createdAt: '2025-09-13T12:00:00Z'
 }
];

//  CONTROLADOR: GET ALL USERS

// /
// * Obtiene la lista de usuarios con filtros opcionales
// * Query params: role, search
// */
const getAllUsers = (req, res) => {
 try {
 const { role, search } = req.query;

 let result = users;

 if (role) {
 result = result.filter(u => u.role === role);
 }

 if (search) {
 result = result.filter(u =>
 u.name.toLowerCase().includes(search.toLowerCase())
 );
 }

 res.status(200).json({
 success: true,
 data: result,
 total: result.length
 });
 } catch (error) {
 res.status(500).json({
 success: false,
 error: 'Error al obtener usuarios',
 message: error.message
 });
 }
};

//  CONTROLADOR: GET USER BY ID
//  /
// * Obtiene un usuario específico por su ID
// */
const getUserById = (req, res) => {
 try {
 const { id } = req.params;

 const user = users.find(u => u.id === id);

 if (!user) {
 return res.status(404).json({
 success: false,
 error: 'Usuario no encontrado'
 });
 }

 res.status(200).json({
 success: true,
 data: user
 });
 } catch (error) {
 res.status(500).json({
 success: false,
 error: 'Error al obtener usuario',
 message: error.message
 });
 }
};

const createUser = (req, res) => {
 try {
 const { name, email, role } = req.body;

//   Validación: campos requeridos
 if (!name || !email) {
 return res.status(400).json({
 success: false,
 error: 'name y email son requeridos'
 });
 }

//   Validación: email válido
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!emailRegex.test(email)) {
 return res.status(400).json({
 success: false,
 error: 'El email no tiene un formato válido'
 });
 }

//   Validación: email único
 const emailExists = users.some(u => u.email === email);
 if (emailExists) {
 return res.status(400).json({
 success: false,
 error: 'El email ya está registrado'
 });
 }

//   Crear nuevo usuario
 const newUser = {
 id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
 name: name.trim(),
 email: email.toLowerCase(),
 role: role ||   'user',
 createdAt: new Date().toISOString()
 };

 users.push(newUser);

 res.status(201).json({
 success: true,
 message: 'Usuario creado exitosamente',
 data: newUser
 });

 } catch (error) {
 res.status(500).json({
 success: false,
 error: 'Error al crear usuario',
 message: error.message
 });
 }
};

// CONTROLADOR: UPDATE USER (PUT)

const updateUser = (req, res) => {
 try {
 const { id } = req.params;
 const { name, email, role } = req.body;

 if (!name || !email || !role) {
 return res.status(400).json({
 success: false,
 error: 'name, email y role son requeridos'
 });
 }
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!emailRegex.test(email)) {
 return res.status(400).json({
 success: false,
 error: 'El email no tiene un formato válido'
 });
 }

 const index = users.findIndex(u => u.id === id);

 if (index === -1) {
 return res.status(404).json({
 success: false,
 error: 'Usuario no encontrado'
 });
 }

 users[index] = {
  ...users[index],
 name: name.trim(),
 email: email.toLowerCase(),
 role
 };

 res.status(200).json({
 success: true,
 message: 'Usuario actualizado exitosamente',
 data: users[index]
 });
 } catch (error) {
 res.status(500).json({
 success: false,
 error: 'Error al actualizar usuario',
 message: error.message
 });
 }
};

//  CONTROLADOR: PARTIAL UPDATE (PATCH)

const partialUpdateUser = (req, res) => {
 try {
 const { id } = req.params;
const updates = req.body;

 if (Object.keys(updates).length === 0) {
 return res.status(400).json({
 success: false,
 error: 'Debes proporcionar al menos un campo para actualizar'
 });
 }

 const index = users.findIndex(u => u.id === id);

 if (index === -1) {
 return res.status(404).json({
 success: false,
 error: 'Usuario no encontrado'
 });
 }

 if (updates.name) {
 updates.name = updates.name.trim();
 }

 users[index] = {
  ...users[index],
  ...updates
 };

 res.status(200).json({
 success: true,
 message: 'Usuario actualizado parcialmente',
 data: users[index]
 });
 } catch (error) {
 res.status(500).json({
 success: false,
 error: 'Error al actualizar usuario',
 message: error.message
 });
 }
};

// CONTROLADOR: DELETE USER

const deleteUser = (req, res) => {
 try {
 const { id } = req.params;

 const index = users.findIndex(u => u.id === id);
 if (index === -1) {
 return res.status(404).json({
 success: false,
 error: 'Usuario no encontrado'
 });
 }

 const deletedUser = users.splice(index, 1)[0];

 res.status(200).json({
 success: true,
 message: 'Usuario eliminado exitosamente',
 data: {
 id: deletedUser.id,
 name: deletedUser.name,
 email: deletedUser.email
 }
 });
 } catch (error) {
 res.status(500).json({
 success: false,
 error: 'Error al eliminar usuario',
 message: error.message
 });
 }
};
module.exports = {
 getAllUsers,
 getUserById,
 createUser,
 updateUser,
 partialUpdateUser,
 deleteUser
}



