import { Router } from "express";
import { sendMessage } from "../controllers/chats.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.middleware.js";

const chatRouter = Router();

chatRouter.post('/send-message/:id', protectedRoute, sendMessage)

export default chatRouter;