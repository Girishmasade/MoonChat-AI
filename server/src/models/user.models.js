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
    isAdmin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    googleId: {
        type: String,
        default: null
    },
    githubId: {
        type: String,
        default: null
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