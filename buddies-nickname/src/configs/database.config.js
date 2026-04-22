import mongoose from "mongoose";
import { DB_URI } from "./env.config.js";

/**
 * function to connect the server to the database
 */
export const connectDb = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database connected successfully");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
