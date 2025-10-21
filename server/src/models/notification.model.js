import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.Mixed,
      ref: "user",
      required: true,
    },
    type: {
      type: String,
      enum: ["message", "friend_request", "system"],
      default: "message",
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    notificationSettings: {
      email: {
        type: Boolean,
        default: true,
      },
      push: {
        type: Boolean,
        default: true,
      },
      desktop: {
        type: Boolean,
        default: true,
      },
      marketing: {
        type: Boolean,
        default: true,
      },
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
