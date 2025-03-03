import { Router } from "express";
import { login, registerClient } from "./auth.controller.js";
 
const router = Router();
 
router.post(
    '/login',
    login
);

router.post(
    '/registerClient',
    registerClient
);

export default router;