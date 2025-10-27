import Notification from "../models/notification.model.js";
import ErrorHandler from "../utils/errorHadler.js";
import { io, onlineUsers } from "../../socket.js";
import SuccessHandler from "../utils/successHandler.js";
import User from "../models/user.models.js";

export const sendNotificationRoute = async (req, res, next) => {
  try {
    const { senderId, receiverId, type, content } = req.body;
    const io = req.app.get("io");

    if (!senderId || !receiverId) {
      return next(new ErrorHandler("Sender and Receiver IDs are required", 400));
    }

    const notification = await Notification.create({
      senderId,
      receiverId,
      type: type || "message",
      content: content || "You have a new notification",
    });

    if (!notification) {
      return next(new ErrorHandler("Failed to send notification", 500));
    }

    io.to(receiverId.toString()).emit("newNotification", notification.toObject());

    res.status(200).json(
      new SuccessHandler(200, "Notification sent successfully", {
        notification,
      })
    );
  } catch (error) {
    console.error("Error sending notification:", error);
    next(new ErrorHandler("Failed to send notification", 500));
  }
};


export const getNotification = async (req, res, next) => {
  try {
    const user = req.user;
    const receiverId = user?.userId || user?._id;
    console.log(receiverId);
    

    if (!receiverId) {
      return next(new ErrorHandler("reciver ID is required", 400));
    }

    const notifications = await Notification.find( {receiverId} )
      // .populate("senderId", "username email avatar")
      // .sort({ createdAt: -1 });

      console.log(notifications);
      

    res.status(200).json(
      new SuccessHandler(200, "Notifications fetched successfully", {
        count: notifications.length,
        notifications,
      })
    );
  } catch (error) {
    console.error("Error fetching notifications:", error);
    next(new ErrorHandler("Failed to fetch notifications", 500));
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
    const io = req.app.get("io");

    // Emit real-time event to receiver if online
    const receiverSocketId = onlineUsers.get(userId);
    if (receiverSocketId && io) {
      io.to(receiverSocketId).emit("readNotification", updatedNotification);
    }

    return res.status(200).json(
      new SuccessHandler(200, "Notification marked as read", {
        notification: updatedNotification,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const clearNotification = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return next(new ErrorHandler("User ID is required", 400));
    }

    const clearMessages = await Notification.deleteMany({ receiverId: userId });
    // console.log(clearMessages);

    return res.status(200).json(
      new SuccessHandler(200, "All messages successfully deleted", {
        data: clearMessages,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const clearSingleNotification = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new ErrorHandler("Notification ID is required", 400));
    }

    const clearMessageSingle = await Notification.findByIdAndDelete(id);

    if (!clearMessageSingle) {
      return next(new ErrorHandler("Notification not found", 404));
    }

    return res.status(200).json(
      new SuccessHandler(200, "Notification deleted successfully", {
        data: clearMessageSingle,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const stopNotification = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { type } = req.body; // e.g. "email", "push", etc.

    if (!type) {
      return next(new ErrorHandler("Notification type is required", 400));
    }

    // Find user's notification settings
    let notification = await Notification.findOne({ receiverId: userId });

    // If user has no notification record yet, create one
    if (!notification) {
      notification = new Notification({
        receiverId: userId,
        senderId: userId, // optional if you don't need sender
        content: "Notification settings initialized",
      });
    }

    // Toggle the setting (true -> false or false -> true)
    notification.notificationSettings[type] =
      !notification.notificationSettings[type];

    await notification.save();

    res.status(200).json({
      success: true,
      message: `Notification setting for '${type}' updated successfully`,
      data: notification.notificationSettings,
    });
  } catch (error) {
    next(error);
  }
};
