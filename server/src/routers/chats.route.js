import { Router } from "express";
import { addContact, getAllContacts, removeContact, sendMessage } from "../controllers/chats.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.middleware.js";

const chatRouter = Router();

chatRouter.post('/add-contacts', protectedRoute, addContact)
chatRouter.get('/all-contacts', protectedRoute, getAllContacts)
chatRouter.delete('/delete-contact/:contactId', protectedRoute, removeContact) 
chatRouter.post('/send-message/:id', protectedRoute, sendMessage)

export default chatRouter;