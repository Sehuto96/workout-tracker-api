// Paso 1: stubs (solo para compilar mientras implementamos)
const getAllWorkoutPlans = (req, res) => {
return res.status(501).json({ success: false, error: 'TODO: GET /workoutplans' });
};
const getWorkoutPlanById = (req, res) => {
return res.status(501).json({ success: false, error: 'TODO: GET /workoutplans/:id' });
};
module.exports = {
getAllWorkoutPlans,
getWorkoutPlanById,
};