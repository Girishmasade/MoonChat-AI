import Notification from "../models/notification.model.js";
import ErrorHandler from "../utils/errorHadler.js";
import { io, onlineUsers } from "../../socket.js"
import SuccessHandler from "../utils/successHandler.js";

export const sendNotification = async (
  senderId,
  receiverId,
  type,
  content,
  io
) => {
  try {
    if (!senderId) throw new ErrorHandler("SenderId is required", 400);
    if (!receiverId) throw new ErrorHandler("ReceiverId is required", 400);

    const newNotify = await Notification.create({
      senderId,
      receiverId,
      content,
      type: type || "message",
      isRead: false,
    });

    const receiverSocketId = global.onlineUsers?.get(receiverId);
    if (receiverSocketId && io) {
      io.to(receiverSocketId).emit("newNotification", newNotify);
    }

    return newNotify;
  } catch (error) {
    console.error("Error in sendNotification:", error.message);
  }
};

export const sendNotificationRoute = async (req, res, next) => {
  try {
    const senderId = req.user.userId;
    const { receiverId, type, content } = req.body;
    const io = req.app.get("io");

    const notification = await sendNotification(
      senderId,
      receiverId,
      type,
      content,
      io
    );
    res
      .status(200)
      .json(new SuccessHandler(200, "Notification sent", { notification }));
  } catch (error) {
    next(error);
  }
};

export const getNotification = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    if (!userId) return next(new ErrorHandler("User ID is required", 400));

    const notifications = await Notification.find({ receiverId: userId })
      .populate("senderId", "username email avatar")
      .sort({ createdAt: -1 });

    console.log(notifications);

    return res
      .status(200)
      .json(new SuccessHandler(200, "Notification fetched", { notifications }));
  } catch (error) {
    next(error);
  }
};

export const isRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    if (!userId) {
      return next(new ErrorHandler("User ID is required", 400));
    }

    // Correct way to update notification with both ID and receiver check
    const updatedNotification = await Notification.findOneAndUpdate(
      { _id: id, receiverId: userId },
      { isRead: true },
      { new: true }
    );

    if (!updatedNotification) {
      return next(new ErrorHandler("Notification not found", 404));
    }

    // Get io instance from app
    // const io = req.app.get("io");

    // // Emit real-time event to receiver if online
    // const receiverSocketId = onlineUsers.get(userId);
    // if (receiverSocketId && io) {
    //   io.to(receiverSocketId).emit("readNotification", updatedNotification);
    // }

    return res.status(200).json(
      new SuccessHandler(200, "Notification marked as read", {
        notification: updatedNotification,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const stopNotification = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
