import { Router } from "express";
import { validarJWT} from "../middlewares/validar-jwt.js";
import { esAdmin } from "../helpers/generate-jwt.js";
import { register, getCompanias } from './compania.controller.js'
import { registerValidator } from "../middlewares/validator.js";

const router = Router();

router.post(
    '/register',
    registerValidator,
    register
);

router.get(
    '/companias',
    validarJWT,
    esAdmin,
    getCompanias // Añadir la nueva ruta
);

export default router;