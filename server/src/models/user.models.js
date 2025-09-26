import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
    },
    avatar:{
        type: String,
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    contact: {
        type: Number,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const User = mongoose.model("user", userSchema)
export default User