import { Router } from "express";
import {
  getNotification,
  isRead,
  sendNotificationRoute,
  stopNotification,
} from "../controllers/notification.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.middleware.js";

const notificationRouter = Router();

notificationRouter.post(
  "/send-notification",
  protectedRoute,
  sendNotificationRoute
);
notificationRouter.get("/get-notification", protectedRoute, getNotification);
notificationRouter.put("/is-read/:id", protectedRoute, isRead);
notificationRouter.patch("/stop-notification", protectedRoute, stopNotification);

export default notificationRouter;
