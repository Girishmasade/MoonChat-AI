import mongoose from "mongoose";
import { mongo_url } from "../env/envImportFile.js";

const connectDB = () => {
    try {
     const connection = mongoose.connect(mongo_url)
     if (connection) {
        console.log("Database Connected Successfully");
     }
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default connectDB;