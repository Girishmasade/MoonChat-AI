import { Router } from "express";
import {
  clearNotification,
  clearSingleNotification,
  getNotification,
  isRead,
  sendNotificationRoute,
  stopNotification,
} from "../controllers/notification.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.middleware.js";
import { googleProtectedRoute } from "../middlewares/google.middleware.js";

const notificationRouter = Router();

notificationRouter.post(
  "/send-notification",
  protectedRoute,
  sendNotificationRoute
);
notificationRouter.get("/get-notification", protectedRoute, getNotification);
notificationRouter.put("/is-read/:id", protectedRoute, isRead);
notificationRouter.patch("/stop-notification", protectedRoute, stopNotification);

notificationRouter.delete("/clear", protectedRoute, clearNotification)
notificationRouter.delete("/clear/:id", protectedRoute, clearSingleNotification)

export default notificationRouter;
