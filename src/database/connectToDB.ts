import mongoose from "mongoose";
import { DB_URI } from "../api/constants/env";


const connectToMongoDB = async () => {
  try {
    if (!DB_URI) {
      throw new Error("Missing DB_URI environment variable");
    }
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectToMongoDB;