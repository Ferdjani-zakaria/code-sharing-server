import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL: string = process.env.MONGODB_URL ?? "";

const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(MONGODB_URL);
        if (conn) {
            console.log(`MongoDB Connected on ${conn.connection.host}`);
        } else {
            console.log("Failed to connect DB");
        }
    } catch (err) {
        console.error(err);
    }
};

export default connectDB;
