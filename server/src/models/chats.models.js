import mongoose, { Schema } from "mongoose";

const chatsSchema = new Schema(
  {
    conversationId: {
      type: String,
      required: true,
      index: true,
    },

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
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    messages: [{ type: String }],
    content: {
      type: String,
      required: true,
    },

    model: String,
    sources: [String],

    media: {
      type: [String], //includes images, videos, files etc
      default: [],
    },
    ttlForSender: { type: Date },
  },
  { timestamps: true },
);

const Chats = mongoose.model("chat", chatsSchema);
export default Chats;
