import mongoose, { Schema } from "mongoose";

const chatsSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
     receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    messages: {
        type: String,
        required: true,
    },
    media: {
       type: [String], //includes images, videos, files etc
        default: []
    },
    lastseen: {
        type: Date,
        default: null
    }

}, { timestamps: true})

const Chats = mongoose.model("chat", chatsSchema)
export default Chats