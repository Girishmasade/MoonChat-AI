import mongoose, { Schema } from "mongoose";

const chatsSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.Mixed,
      ref: "user",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.Mixed,
      ref: "user",
      required: true,
    },
    media: {
      type: [String], //includes images, videos, files etc
      default: [],
    },
    ttlForSender: { type: Date },
  },
  { timestamps: true }
);

const Chats = mongoose.model("chat", chatsSchema);
export default Chats;
