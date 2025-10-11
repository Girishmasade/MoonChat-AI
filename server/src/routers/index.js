import { Router } from "express";
import authRouter from "./auth.route.js";
import chatRouter from "./chats.route.js";

const router = Router()

router.use("/auth", authRouter)
router.use("/chats", chatRouter)


export default router