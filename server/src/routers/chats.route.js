import { Router } from "express";
import {
  addContact,
  clearMessages,
  contactList,
  getAllContacts,
  getAllMessages,
  removeContact,
  sendMessage,
} from "../controllers/chats.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.middleware.js";
import { uploadMedia } from "../middlewares/media.middleware.js";

const chatRouter = Router();

chatRouter.post("/add-contacts", protectedRoute, addContact);
chatRouter.get("/all-contacts", protectedRoute, getAllContacts);
chatRouter.get("/contact-list/:listId", protectedRoute, contactList);
chatRouter.delete("/delete-contact/:contactId", protectedRoute, removeContact);

// Messages Route

chatRouter.post( "/send-message/:id", protectedRoute, uploadMedia.any(), sendMessage);
chatRouter.get("/get-message/:contactId", protectedRoute, getAllMessages);
chatRouter.delete("/delete-messages/:receiverId", protectedRoute, clearMessages)

export default chatRouter;
