import { Router } from "express";
import { validarJWT} from "../middlewares/validar-jwt.js";
import { tieneRole } from "../middlewares/validar-roles.js";
import { register, getCompanias, viewCompanyById} from './compania.controller.js';
import { registerValidator } from "../middlewares/validator.js";

const router = Router();

router.post(
    '/register',
    registerValidator,
    register
);

router.get(
    '/getCompanias',
    validarJWT,
    tieneRole ("ADMIN_ROLE"),
    getCompanias // Añadir la nueva ruta
);

router.get(
    '/viewCompanyById/:id',
    validarJWT,
    tieneRole ("ADMIN_ROLE"),
    viewCompanyById // Añadir la nueva ruta
);


export default router;