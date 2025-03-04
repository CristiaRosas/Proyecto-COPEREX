import { Router } from "express";
import { validarJWT} from "../middlewares/validar-jwt.js";
import { tieneRole } from "../middlewares/validar-roles.js";
import { register, getCompanias, viewCompanyById, updateCompany} from './compania.controller.js';
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
    getCompanias 
);

router.get(
    '/viewCompanyById/:id',
    validarJWT,
    tieneRole ("ADMIN_ROLE"),
    viewCompanyById 
);

router.put(
    '/updateCompany/:id',
    validarJWT,
    tieneRole("ADMIN_ROLE"),
    updateCompany
)

export default router;