import mongoose, { Schema } from "mongoose";

const chatsSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    reciverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    message: {
        type: String,
        required: true,
    },
    media: {
        type: Array,
        default: []
    },
    emoji:{
        type: String,
    }
}, { timestamps: true})

const Chats = mongoose.model("chats", chatsSchema)
export default Chats