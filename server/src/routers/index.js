import { Router } from "express";
import authRouter from "./auth.route.js";
import chatRouter from "./chats.route.js";
import AiChatRouter from "./aichat.route.js";
import notificationRouter from "./notification.route.js";
import adminRoutes from "./admin.route.js";
import rateLimit from "express-rate-limit";

const router = Router()

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minute window
  max: 10,                     // 10 attempts per 15 min per IP
  message: { success: false, message: "Too many attempts. Please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,         // 1 minute window
  max: 20,                     // 20 AI requests per minute per IP
  message: { success: false, message: "Too many AI requests. Please slow down." },
  standardHeaders: true,
  legacyHeaders: false,
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minute window
  max: 30,                     // 30 requests per 15 min per IP
  message: { success: false, message: "Too many admin requests." },
  standardHeaders: true,
  legacyHeaders: false,
});


const generalLimiter = rateLimit({
  windowMs: 60 * 1000,         // 1 minute window
  max: 60,                     // 60 requests per minute per IP
  message: { success: false, message: "Too many requests. Please slow down." },
  standardHeaders: true,
  legacyHeaders: false,
});


router.use("/auth", authLimiter, authRouter)
router.use("/admin", adminLimiter, adminRoutes)
router.use("/chats", chatRouter)
router.use("/aiChat", aiLimiter, AiChatRouter)
router.use("/notifications", generalLimiter, notificationRouter)

export default router