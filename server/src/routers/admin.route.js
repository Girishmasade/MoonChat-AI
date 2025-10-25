import { Router } from "express";
import { adminLogin, adminRegister } from "../controllers/admin.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const adminRoutes = Router()

authRouter.post("/signup", adminMiddleware, adminRegister);
authRouter.post("/signin", adminMiddleware, adminLogin)

export default adminRoutes