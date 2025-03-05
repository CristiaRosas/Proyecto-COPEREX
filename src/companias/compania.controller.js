import Compania from './compania.model.js';
import XLSX from 'xlsx';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

export const register = async (req, res) => {
    try {
        let data = req.body;

        const existingCompania = await Compania.findOne({ name: data.name });
        if (existingCompania) {
            return res.status(400).send({
                success: false,
                message: 'Ya existe una empresa con este nombre', 
            });
        }

        let newCompania = new Compania(data); 
        await newCompania.save();

        return res.status(201).send({ 
            success: true,
            message: `${newCompania.name}, Se registro con exito!! `,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Hubo un error al registrar compania',
            error: error.message, 
        });
    }
};

export const getCompanias = async (req, res) => {
    try {
        const { categoria, ordenar, ordenarPor } = req.query; 

        let filter = { status: true }; 

        if (categoria) {
            filter.categoria = categoria; 
        }

        let sort = {};

        if (ordenarPor === "año") {
            sort.año = ordenar === "asc" ? -1 : 1;
        } else if (ordenarPor === "año") {
            sort.año = ordenar === "desc" ? 1 : -1;
        }
        
        if (ordenar === "A-Z") {
            sort.name = 1; 
        } else if (ordenar === "Z-A") {
            sort.name = -1; 
        }

        const companias = await Compania.find(filter).sort(sort);

        return res.status(200).json({
            success: true,
            companias,
        });
    } catch (error) {
        console.error("Hubo un error al obtener compania", error);
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
                msg: 'No se encontro usuario en la base de datos'
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

export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params; 
        const data = req.body; 

        
        const compania = await Compania.findById(id);

        if (!compania) {
            return res.status(404).json({
                success: false,
                message: "No se encontró la empresa en la base de datos",
            });
        }

        
        const updatedCompania = await Compania.findByIdAndUpdate(id, data, {
            new: true, 
            runValidators: true, 
        });

        return res.status(200).json({
            success: true,
            message: "Empresa actualizada con exito!",
            compania: updatedCompania,
        });
    } catch (error) {
        console.error("Error al actualizar la empresa:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor al actualizar la empresa.",
            error: error.message,
        });
    }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generateCompanyReport = async (req, res) => {
    try {
        const companias = await Compania.find();

        if (companias.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No hay empresas registradas para generar el reporte.",
            });
        }

        const reportData = companias.map(compania => ({
            'ID': compania._id,
            'Nombre': compania.name,
            'Categoria': compania.categoria || 'No definida',
            'Años en la industria': compania.año || 'No disponible',
            'Estado': compania.status ? 'Activo' : 'Inactivo',
        }));

        const ws = XLSX.utils.json_to_sheet(reportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Reporte de Empresas");

        const fileName = 'reporte_empresas.xlsx';
        const folderPath = path.join(__dirname, '..', 'excel-Report');
        const filePath = path.join(folderPath, fileName);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        XLSX.writeFile(wb, filePath);

        return res.status(200).json({
            success: true,
            message: `Reporte generado con éxito. El archivo se ha guardado en ${filePath}`,
        });

    } catch (error) {
        console.error("Error al generar el reporte:", error);
        return res.status(500).json({
            success: false,
            message: "Hubo un error al generar el reporte.",
            error: error.message,
        });
    }
};