import { ENV } from "./env.js";
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGODB_URI)
        console.log("mongoDB connect successfully:", conn.connection.host);
    
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}