import Chats from "../models/chats.models.js";
import User from "../models/user.models.js";
import ErrorHandler from "../utils/errorHadler.js";
import SuccessHandler from "../utils/successHandler.js";
import { io, onlineUsers } from "../../socket.js";
import Notification from "../models/notification.model.js";
import { generateAIResponse } from "../services/AI/ai.service.js";
import { getChatHistory } from "../services/AI/memory.service.js";
import { retrieveContext } from "../services/AI/rag.service.js";
// import { sendNotification } from "./notification.controller.js";
// import mongoose from "mongoose";

export const addContact = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { username, email } = req.body;

    if (!email || !username) {
      return next(new ErrorHandler("Please provide all the fields", 400));
    }

    const contactUser = await User.findOne({ email }).select(
      "name lastname username email avatar",
    );

    if (!contactUser) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (contactUser._id.toString() === userId) {
      return next(
        new ErrorHandler("You cannot add yourself as a contact", 400),
      );
    }

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return next(new ErrorHandler("Current user not found", 404));
    }

    const alreadyInContacts = currentUser.contacts.some(
      (contactId) => contactId.toString() === contactUser._id.toString(),
    );

    if (alreadyInContacts) {
      return next(new ErrorHandler("Contact already exists", 400));
    }

    currentUser.contacts.push(contactUser._id);
    await currentUser.save();

    return res.status(200).json(
      new SuccessHandler(200, "Contact added successfully", {
        contactUser: {
          _id: contactUser._id,
          name: contactUser.name,
          lastname: contactUser.lastname,
          username: contactUser.username,
          email: contactUser.email,
          avatar: contactUser.avatar,
        },
      }),
    );
  } catch (error) {
    next(error);
  }
};

export const requestContact = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const users = await User.findById(userId)
      .select("-password -googleId -githubId -isAdmin -createdAt -updatedAt")
      .populate(
        "contacts",
        "-password -googleId -githubId -isAdmin -createdAt -updatedAt",
      );

    // console.log(users);

    if (!users) {
      return next(new ErrorHandler("No contacts found", 404));
    }

    return res
      .status(200)
      .json(
        new SuccessHandler(200, "All contacts", { contacts: users.contacts }),
      );
  } catch (error) {
    next(error);
  }
};

export const contactList = async (req, res, next) => {
  try {
    const { listId } = req.params;

    const user = await User.findById(listId)
      .populate({
        path: "contacts",
        select: "name lastname username email avatar", // Only return required fields
      })
      .select("-password -googleId -githubId -isAdmin -createdAt -updatedAt");

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json(
      new SuccessHandler({
        message: "Contacts fetched successfully",
        data: user.contacts,
      }),
    );
  } catch (error) {
    next(error);
  }
};

export const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { contactId } = req.params;

    if (!contactId) {
      return next(new ErrorHandler("Contact ID is required", 400));
    }

    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const contactExists = user.contacts.some(
      (id) => id.toString() === contactId,
    );

    if (!contactExists) {
      return next(new ErrorHandler("Contact not found in your list", 404));
    }

    user.contacts = user.contacts.filter((id) => id.toString() !== contactId);

    await user.save();

    return res
      .status(200)
      .json(new SuccessHandler(200, "Contact removed successfully"));
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const senderId = req.user.userId;
    const receiverId = req.params.id;
    const io = req.app.get("io");

    const message = req.body.message;
    const mediaFiles = req.files ? req.files.map((f) => f.path) : [];

    if (!message && mediaFiles.length === 0) {
      return next(new ErrorHandler("Message or media is required", 400));
    }

    const conversationId = [senderId, receiverId].sort().join("_");

    const newMessage = await Chats.create({
      conversationId,
      senderId,
      receiverId,
      role: "user",
      content: message || "",
      media: mediaFiles,
    });

    const receiverSocketId = onlineUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", {
        ...newMessage.toObject(),
      });
    }

    res
      .status(200)
      .json(new SuccessHandler(200, "Message sent", { data: newMessage }));
  } catch (error) {
    next(error);
  }
};

export const clearMessages = async (req, res, next) => {
  try {
    const senderId = req.user.userId;
    const { receiverId } = req.params;

    if (!senderId || !receiverId) {
      return next(new ErrorHandler("SenderId & receiverId is required", 400));
    }

    await Chats.deleteMany({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    io.to(senderId.toString()).emit("messagesCleared", { receiverId });
    io.to(receiverId.toString()).emit("messagesCleared", { senderId });

    return res
      .status(200)
      .json(200, "Message deleted Successfully", { data: [] });
  } catch (error) {
    next(error);
  }
};

export const getAllMessages = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { contactId } = req.params;

    if (!contactId) {
      return next(new ErrorHandler("Contact ID is required", 400));
    }

    const messages = await Chats.find({
      $or: [
        { senderId: userId, receiverId: contactId },
        { senderId: contactId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    return res
      .status(200)
      .json(new SuccessHandler(200, "All messages fetched", { messages }));
  } catch (error) {
    next(error);
  }
};

export const AiMessage = async (req, res, next) => {
  try {
    const senderId = req.user.userId;
    const receiverId = process.env.AI_USER_ID;

    const message = req.body.message || req.body.text || req.body.prompt;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const conversationId = [senderId, receiverId].sort().join("_");

    // SAVE USER MESSAGE FIRST
    await Chats.create({
      conversationId,
      senderId,
      receiverId,
      role: "user",
      content: message,
    });

    const history = await getChatHistory(conversationId);
    const { context, sources } = await retrieveContext(message);

    const aiResponse = await generateAIResponse({
      message,
      history,
      context,
    });

    const aiMsg = await Chats.create({
      conversationId,
      senderId: receiverId,
      receiverId: senderId,
      role: "assistant",
      content: aiResponse,
      sources,
    });

    res.status(200).json({
      success: true,
      data: aiMsg,
    });
  } catch (err) {
    console.error("AI ERROR:", err);
    next(err);
  }
};

// export const getAiMessages = async (req, res, next) => {
//   try {
//     const senderId = req.user.userId;
//     const receiverId = process.env.AI_USER_ID; // Gemini AI User ID

//     if (!senderId || !receiverId) {
//       return next(new ErrorHandler("SenderId and ReceiverId is required", 400));
//     }

//     const messages = await Chats.find({
//       $or: [
//         { senderId: senderId, receiverId: receiverId },
//         { senderId: receiverId, receiverId: senderId },
//       ],
//     }).sort({ createdAt: 1 });

//     // console.log(messages);

//     return res
//       .status(200)
//       .json(new SuccessHandler(200, "All AI messages", { messages }));
//   } catch (error) {
//     next(error);
//   }
// };

export const getAiMessages = async (req, res, next) => {
  try {
    const senderId = req.user.userId;
    const receiverId = process.env.AI_USER_ID;

    if (!senderId || !receiverId) {
      return next(new ErrorHandler("SenderId and ReceiverId is required", 400));
    }

    const conversationId = [senderId, receiverId].sort().join("_");

    const { page = 1, limit = 20 } = req.query;

    const messages = await Chats.find({ conversationId })
      .sort({ createdAt: -1 }) // latest first
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.status(200).json(
      new SuccessHandler(200, "All AI messages", {
        messages,
        page: Number(page),
      })
    );
  } catch (error) {
    next(error);
  }
};

export const aiClearChat = async (req, res, next) => {
  try {
    const senderId = req.user.userId;
    const receiverId = process.env.AI_USER_ID;

    if (!senderId || !receiverId) {
      return next(new ErrorHandler("SenderId & receiverId is required", 400));
    }

    await Chats.deleteMany({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    const updatedChats = await Chats.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      message: "Messages deleted successfully",
      data: [],
    });
  } catch (error) {
    next(error);
  }
};
