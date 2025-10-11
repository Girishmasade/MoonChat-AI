import { Schema } from "mongoose";

const contactSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        },
     status : {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending"
        }
}, { timestamps: true });

const Contact = mongoose.model("contact", contactSchema);
export default Contact;