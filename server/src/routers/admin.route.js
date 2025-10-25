import { Router } from "express";
import { adminLogin, adminRegister } from "../controllers/admin.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const adminRoutes = Router()

adminRoutes.post("/signup", adminRegister);
adminRoutes.post("/signin", adminLogin)

export default adminRoutes