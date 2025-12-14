const express = require('express');
const {
getAllWorkoutPlans,
getWorkoutPlanById,
createWorkoutPlan,
updateWorkoutPlan,
partialUpdateWorkoutPlan,
deleteWorkoutPlan,
} = require('../../controllers/workoutsplans.controller');
const router = express.Router();
// GET
router.get('/', getAllWorkoutPlans);
router.get('/:id', getWorkoutPlanById);
// Declaración de rutas futuras
router.post('/', createWorkoutPlan);
router.put('/:id', updateWorkoutPlan);
router.patch('/:id', partialUpdateWorkoutPlan);
router.delete('/:id', deleteWorkoutPlan);
module.exports = router;    