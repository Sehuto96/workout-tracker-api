
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

// * Obtiene la lista de usuarios con filtros opcionales
// * Query params: role, search
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

// CONTROLADOR: GET USER BY ID
// * Obtiene un usuario específico por su ID
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


module.exports = {
  getAllUsers,
  getUserById
};
