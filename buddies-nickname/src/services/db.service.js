import mongoose from "mongoose";
import { DB_URI } from "../configs/env.config.js ";

export const connectDb = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database connected successfully");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
