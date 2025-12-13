

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
    try {
        const { userId, title, description, exercises } = req.body;
        if (!userId || !title || !description || !Array.isArray(exercises)) {
            return res.status(400).json({ success: false, error: 'userId, title, description y exercises son requeridos' });
        }
        for (const it of exercises) {
            if (!isValidExerciseItem(it)) {
                return res.status(400).json({ success: false, error: 'Cada ejercicio debe tener exerciseId, name, sets, reps, weight y notes válidos' });
            }
        }
        const now = new Date().toISOString();
        const newPlan = {
            id: randomUUID(),
            userId: String(userId).trim(),
            title: String(title).trim(),
            description: String(description).trim(),
            createdAt: now,
            updatedAt: now,
            exercises: exercises.map(e => ({
                exerciseId: String(e.exerciseId).trim(),
                name: String(e.name).trim(),
                sets: Number(e.sets),
                reps: Number(e.reps),
                weight: Number(e.weight),
                notes: String(e.notes)
            }))
        };
        workoutPlans.push(newPlan);
        return res.status(201).json({ success: true, message: 'Workout plan creado', data: newPlan });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Error al crear workout plan', message: error.message });
    }
};

const updateWorkoutPlan = (req, res) => {
    try {
        const { id } = req.params;
        const { userId, title, description, exercises } = req.body;
        if (!userId || !title || !description || !Array.isArray(exercises)) {
            return res.status(400).json({ success: false, error: 'userId, title, description y exercises son requeridos' });
        }
        for (const it of exercises) {
            if (!isValidExerciseItem(it)) {
                return res.status(400).json({ success: false, error: 'Cada ejercicio debe tener exerciseId, name, sets, reps, weight y notes válidos' });
            }
        }
        const idx = workoutPlans.findIndex(p => p.id === id);
        if (idx === -1) {
            return res.status(404).json({ success: false, error: 'Workout plan no encontrado' });
        }
        const now = new Date().toISOString();
        workoutPlans[idx] = {
            ...workoutPlans[idx],
            userId: String(userId).trim(),
            title: String(title).trim(),
            description: String(description).trim(),
            updatedAt: now,
            exercises: exercises.map(e => ({
                exerciseId: String(e.exerciseId).trim(),
                name: String(e.name).trim(),
                sets: Number(e.sets),
                reps: Number(e.reps),
                weight: Number(e.weight),
                notes: String(e.notes)
            }))
        };
        return res.status(200).json({ success: true, message: 'Workout plan actualizado', data: workoutPlans[idx] });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Error al actualizar workout plan', message: error.message });
    }
};

const partialUpdateWorkoutPlan = (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates || typeof updates !== 'object' || Object.keys(updates).length === 0) {
            return res.status(400).json({ success: false, error: 'Debes proporcionar al menos un campo para actualizar' });
        }

        const idx = workoutPlans.findIndex(p => p.id === id);
        if (idx === -1) {
            return res.status(404).json({ success: false, error: 'Workout plan no encontrado' });
        }

        const now = new Date().toISOString();
        const plan = workoutPlans[idx];
        const sanitized = {};

        if (updates.userId) sanitized.userId = String(updates.userId).trim();
        if (updates.title) sanitized.title = String(updates.title).trim();
        if (updates.description) sanitized.description = String(updates.description).trim();

        if (updates.exercises) {
            if (!Array.isArray(updates.exercises)) {
                return res.status(400).json({ success: false, error: 'exercises debe ser un array' });
            }
            for (const it of updates.exercises) {
                if (!isValidExerciseItem(it)) {
                    return res.status(400).json({ success: false, error: 'Cada ejercicio debe tener exerciseId, name, sets, reps, weight y notes válidos' });
                }
            }
            sanitized.exercises = updates.exercises.map(e => ({
                exerciseId: String(e.exerciseId).trim(),
                name: String(e.name).trim(),
                sets: Number(e.sets),
                reps: Number(e.reps),
                weight: Number(e.weight),
                notes: String(e.notes)
            }));
        }

        workoutPlans[idx] = {
            ...plan,
            ...sanitized,
            updatedAt: now
        };

        return res.status(200).json({ success: true, message: 'Workout plan actualizado parcialmente', data: workoutPlans[idx] });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Error al actualizar parcialmente', message: error.message });
    }
};

const deleteWorkoutPlan = (req, res) => {
    return res.status(501).json({ success: false, error: 'TODO: DELETE /workoutplans/:id' });
};

function isValidExerciseItem(item) {
return item &&
typeof item.exerciseId === 'string' &&
typeof item.name === 'string' &&
Number.isFinite(Number(item.sets)) && Number(item.sets) > 0 &&
Number.isFinite(Number(item.reps)) && Number(item.reps) > 0 &&
Number.isFinite(Number(item.weight)) && Number(item.weight) >= 0 &&
typeof item.notes === 'string';
}



module.exports = {
    getAllWorkoutPlans,
    getWorkoutPlanById,
    createWorkoutPlan,
    updateWorkoutPlan,
    partialUpdateWorkoutPlan,
    deleteWorkoutPlan,
};
