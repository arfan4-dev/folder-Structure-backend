import { Router } from "express";
import { userRegister } from "../controllers/user.controller.js";
const router = Router();

router.post('/register').post(userRegister);
export default router;