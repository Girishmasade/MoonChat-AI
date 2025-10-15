import mongoose from "mongoose";

const connectDB = () => {
    try {
     const connection = mongoose.connect(process.env.MONGO_URI)
     if (connection) {
        console.log("Database Connected Successfully");
     }
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default connectDB;