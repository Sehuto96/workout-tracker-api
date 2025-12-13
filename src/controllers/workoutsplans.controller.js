// Estado en memoria (demo)
let workoutPlans = [
    {
        id: 'a0f8d492-2792-49b4-8af3-70a09e5dc342',
        userId: 'b42f53fa-7b30-4b91-8d36-dc1c6ef27611',
        title: 'Rutina de Tren Superior',
        description: 'Plan enfocado en pecho, espalda y hombros.',
        createdAt: '2025-09-12T14:00:00Z',
        updatedAt: '2025-09-13T09:30:00Z',
        exercises: [
            { exerciseId: 'd09f3bb4-35b6-4a7b-b5a1-09f01d3a28bc', name: 'Sentadilla', sets: 4, reps: 10 },
            { exerciseId: '2a1f3bb4-33c6-1c7a-b5a1-99f01d3a45fg', name: 'Press de banca', sets: 3, reps: 8 }
        ]
    },
];

const getAllWorkoutPlans = (req, res) => {
    try {
        const { userId, search, limit } = req.query;
        let result = workoutPlans;
        if (userId) result = result.filter(p => p.userId === String(userId).trim());
        if (search) {
            const s = String(search).toLowerCase();
            result = result.filter(p => p.title.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
        }
        if (limit && Number(limit) > 0) result = result.slice(0, Number(limit));
        return res.status(200).json({ success: true, data: result, total: result.length });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Error al listar workout plans', message: error.message });
    }
};

// Obtener plan por ID
const getWorkoutPlanById = (req, res) => {
    try {
        const { id } = req.params;
        const plan = workoutPlans.find(p => p.id === id);

        if (!plan) {
            return res.status(404).json({
                success: false,
                error: 'Workout plan no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            data: plan
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Error al obtener workout plan',
            message: error.message
        });
    }
};

const createWorkoutPlan = (req, res) => {
return res.status(501).json({ success: false, error: 'TODO: POST /workoutplans' });
};
const updateWorkoutPlan = (req, res) => {
return res.status(501).json({ success: false, error: 'TODO: PUT /workoutplans/:id' });
};
const partialUpdateWorkoutPlan = (req, res) => {
return res.status(501).json({ success: false, error: 'TODO: PATCH /workoutplans/:id' });
};
const deleteWorkoutPlan = (req, res) => {
return res.status(501).json({ success: false, error: 'TODO: DELETE /workoutplans/:id' });
};
module.exports = {
getAllWorkoutPlans,
getWorkoutPlanById,
createWorkoutPlan,
updateWorkoutPlan,
partialUpdateWorkoutPlan,
deleteWorkoutPlan,
};
