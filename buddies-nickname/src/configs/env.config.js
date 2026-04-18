import dotenv from "dotenv";
dotenv.config({
  quiet: true,
});

export const PORT = process.env.PORT;
export const DB_URI = process.env.DB_URI
export const LOGGER_LEVEL = process.env.LOGGER_LEVEL