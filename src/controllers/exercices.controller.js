
// Estado en memoria para ejercicios (demo)
let exercises = [
    {
        id: 'd09f3bb4-35b6-4a7b-b5a1-09f01d3a28bc',
        name: 'Sentadilla',
        description: 'Ejercicio de fuerza para piernas',
        category: 'strength',
        muscleGroup: 'legs',
        createdAt: '2025-09-10T08:30:00Z'
    }
];

// Obtener todos los ejercicios con filtros opcionales
const getAllExercises = (req, res) => {
    try {
        const { category, muscleGroup, search, limit } = req.query;
        let result = [...exercises]; // Clonamos para evitar mutaciones

        // Filtrar por categoría
        if (category) {
            result = result.filter(e => e.category === String(category).trim());
        }

        // Filtrar por grupo muscular
        if (muscleGroup) {
            result = result.filter(e => e.muscleGroup === String(muscleGroup).trim());
        }

        // Búsqueda por nombre o descripción
        if (search) {
            const s = String(search).toLowerCase();
            result = result.filter(e =>
                e.name.toLowerCase().includes(s) ||
                e.description.toLowerCase().includes(s)
            );
        }

        // Limitar resultados
        if (limit && Number(limit) > 0) {
            result = result.slice(0, Number(limit));
        }

        return res.status(200).json({
            success: true,
            data: result,
            total: result.length
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Error al listar ejercicios',
            message: error.message
        });
    }
};

// Obtener un ejercicio por ID
const getExerciseById = (req, res) => {
    try {
        const { id } = req.params;
        const exercise = exercises.find(e => e.id === id);

        if (!exercise) {
            return res.status(404).json({
                success: false,
                error: 'Ejercicio no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            data: exercise
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Error al obtener ejercicio',
            message: error.message
        });
    }
};

// Exportar funciones
module.exports = {
    getAllExercises,
    getExerciseById
};
