import { Router } from "express";
import authRouter from "./auth.route.js";
import chatRouter from "./chats.route.js";
import AiChatRouter from "./aichat.route.js";
import notificationRouter from "./notification.route.js";
import adminRoutes from "./admin.route.js";

const router = Router()

router.use("/auth", authRouter)
router.use("/admin", adminRoutes)
router.use("/chats", chatRouter)
router.use("/aiChat", AiChatRouter)
router.use("/notifications", notificationRouter)

export default router