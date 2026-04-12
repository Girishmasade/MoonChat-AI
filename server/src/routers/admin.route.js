import { Router } from "express";
import { adminLogin, adminProfile, adminRegister, updateAdminProfile } from "../controllers/admin.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { protectedRoute } from "../middlewares/protectedRoute.middleware.js";

const adminRoutes = Router()

adminRoutes.post("/signup", adminRegister);
adminRoutes.post("/signin", adminLogin)
adminRoutes.get("/:userId/profile", protectedRoute, adminMiddleware, adminProfile)
adminRoutes.put("/:userId/profile/update", protectedRoute, adminMiddleware, updateAdminProfile)

export default adminRoutes