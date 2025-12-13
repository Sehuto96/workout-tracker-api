// Paso 1: stubs (solo para compilar mientras implementamos)
const getAllExercises = (req, res) => {
return res.status(501).json({ success: false, error: 'TODO: GET /exercises' });
};
const getExerciseById = (req, res) => {
return res.status(501).json({ success: false, error: 'TODO: GET /exercises/:id' });
};
module.exports = {
getAllExercises,
getExerciseById,
};
