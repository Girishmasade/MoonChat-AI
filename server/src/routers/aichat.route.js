import { Router } from "express";
import { protectedRoute } from "../middlewares/protectedRoute.middleware.js";
import { uploadMedia } from "../middlewares/media.middleware.js";
import { AiMessage, getAiMessages } from "../controllers/chats.controller.js";

const AiChatRouter = Router()

AiChatRouter.post("/send-ai-messages/:receiverId", protectedRoute, uploadMedia.any(), AiMessage)
AiChatRouter.get("/get-ai-messages/:recieverId", protectedRoute, getAiMessages)

export default AiChatRouter