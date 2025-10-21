import Chats from "../models/chats.models.js";
import User from "../models/user.models.js";
import ErrorHandler from "../utils/errorHadler.js";
import SuccessHandler from "../utils/successHandler.js";
import { io, onlineUsers } from "../../socket.js";
import { geminiai } from "../config/geminiai.config.js";
import Notification from "../models/notification.model.js";
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
      "name lastname username email avatar"
    );

    if (!contactUser) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (contactUser._id.toString() === userId) {
      return next(
        new ErrorHandler("You cannot add yourself as a contact", 400)
      );
    }

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return next(new ErrorHandler("Current user not found", 404));
    }

    const alreadyInContacts = currentUser.contacts.some(
      (contactId) => contactId.toString() === contactUser._id.toString()
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
      })
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
        "-password -googleId -githubId -isAdmin -createdAt -updatedAt"
      );

    // console.log(users);

    if (!users) {
      return next(new ErrorHandler("No contacts found", 404));
    }

    return res
      .status(200)
      .json(
        new SuccessHandler(200, "All contacts", { contacts: users.contacts })
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
      })
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
      (id) => id.toString() === contactId
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

    if (!senderId || !receiverId) {
      return next(
        new ErrorHandler("SenderId and ReceiverId are required", 400)
      );
    }

    const { message } = req.body; // singular to match frontend
    const mediaFiles = req.files ? req.files.map((file) => file.path) : [];

    if (!message && mediaFiles.length === 0) {
      return next(new ErrorHandler("Message or media is required", 400));
    }

    // Create new message document
    const newMessage = new Chats({
      senderId,
      receiverId,
      messages: message || "", // store actual text
      media: mediaFiles,
    });

    await newMessage.save();

    // Emit the message to the receiver if online
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", {
        _id: newMessage._id,
        senderId,
        receiverId,
        message: newMessage.messages,
        media: mediaFiles,
        createdAt: newMessage.createdAt,
      });
    }

    // Emit to sender (for confirmation)
    const senderSocketId = onlineUsers.get(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessageSent", {
        _id: newMessage._id,
        senderId,
        receiverId,
        message: newMessage.messages,
        media: mediaFiles,
        createdAt: newMessage.createdAt,
      });
    }

     const sender = await User.findById(senderId).select("username");

    const notification = await Notification.create({
      senderId,
      receiverId,
      type: "message",
      content: `${sender.username} sent you a message`,
    });

    io.to(receiverId.toString()).emit("newNotification", notification);

    return res
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
    const { messages, media } = req.body;
    const io = req.app.get("io");

    if (!senderId || !receiverId) {
      return next(new ErrorHandler("SenderId and ReceiverId is required", 400));
    }

    if (!messages && (!media || media.length === 0)) {
      return next(new ErrorHandler("Messages and Media is required", 400));
    }

    const modal = geminiai.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await modal.generateContent(messages);
    const aiResponse = result.response.text();

    const mediaFiles = req.files ? req.files.map((file) => file.path) : [];

    const userMessage = new Chats({
      senderId,
      receiverId,
      messages,
      media: mediaFiles,
    });
    await userMessage.save();

    const AiMessage = new Chats({
      senderId: receiverId,
      receiverId: senderId,
      messages: aiResponse,
      media: mediaFiles,
      ttlForSender: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    await AiMessage.save();

    io.to(senderId).emit("newAiMessage", {
      senderId: receiverId,
      receiverId: senderId,
      messages: aiResponse,
      media: mediaFiles,
    });

    return res
      .status(200)
      .json(new SuccessHandler(200, "AI Message Sent", { AiMessage }));
  } catch (error) {
    next(error);
  }
};

export const getAiMessages = async (req, res, next) => {
  try {
    const senderId = req.user.userId;
    const receiverId = process.env.AI_USER_ID; // Gemini AI User ID

    if (!senderId || !receiverId) {
      return next(new ErrorHandler("SenderId and ReceiverId is required", 400));
    }

    const messages = await Chats.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    // console.log(messages);

    return res
      .status(200)
      .json(new SuccessHandler(200, "All AI messages", { messages }));
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

    return res
      .status(200)
      .json(200, "Message deleted Successfully", { data: updatedChats });
  } catch (error) {
    next(error);
  }
};
