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
        const companias = await Compania.find(); // Obtener todas las compañías

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

/* export const viewCompanyById = async (req, res) => {
    const { id } = req.params;
    try {
        const company = await Client.findById(id)
        if (!company) {
            return res.status(404).send({
                success: false,
                message: 'Company not found',
            });
        }
        return res.status(200).send({
            success: true,
            message: 'Company', company
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error when listing',
            error
        });
    }
} */