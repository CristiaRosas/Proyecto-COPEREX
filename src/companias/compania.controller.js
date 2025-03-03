import Compania from './compania.model.js';

export const register = async (req, res) => {
    try {
        let data = req.body;

        const existingCompania = await Compania.findOne({ name: data.name });
        if (existingCompania) {
            return res.status(400).send({
                success: false,
                message: 'Company with this name already exists.', // Corregido mensaje
            });
        }

        let newCompania = new Compania(data); // Usar un nombre diferente para la instancia
        await newCompania.save();

        return res.status(201).send({ // Cambiado a 201 para indicar creación
            success: true,
            message: `${newCompania.name}, Se registro con exito!! `,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error registering',
            error: error.message, // Incluir el mensaje de error para depuración
        });
    }
};

export const getCompanias = async (req, res) => {
    try {
        // Obtener los parámetros de consulta (query params)
        const { categoria, anios, ordenar, ordenarPor } = req.query; // Definir parámetros de consulta

        // Construir el filtro dinámicamente
        let filter = { status: true }; // Filtrar solo las empresas activas

        if (categoria) {
            filter.categoria = categoria; // Filtrar por categoría
        }

        if (anios) {
            // Filtrar por años de trayectoria, se asume que 'anios' es el campo en la base de datos
            filter.anios = { $gte: anios }; // Empresas con más de 'anios' años de trayectoria
        }

        // Construir el ordenamiento dinámicamente
        let sort = {};
        if (ordenar) {
            if (ordenar === "A-Z") {
                sort.name = 1; // Ordenar de A-Z
            } else if (ordenar === "Z-A") {
                sort.name = -1; // Ordenar de Z-A
            } else if (ordenar === "mayor") {
                sort.createdAt = ordenarPor === "asc" ? 1 : -1; // Ordenar por fecha de creación
            } else if (ordenar === "menor") {
                sort.createdAt = ordenarPor === "desc" ? 1 : -1; // Ordenar por fecha de creación
            } 
            
        }

        // Obtener las compañías con el filtro y ordenamiento
        const companias = await Compania.find(filter).sort(sort);

        return res.status(200).json({
            success: true,
            companias,
        });
    } catch (error) {
        console.error("Error al obtener compañías:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor al obtener las compañías.",
            error: error.message,
        });
    }
};

export const viewCompanyById = async (req, res) => {
    try {
        
        const { id } = req.params;

        const compania = await Compania.findById(id);

        if(!compania){
            return res.status(404).json({
                success: false,
                msg: 'Usuario not found'
            })
        }

        res.status(200).json({
            success: true,
            compania
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al obtener Usuario',
            error: error.message
        })
    }
}