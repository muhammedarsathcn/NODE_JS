import dotenv from "dotenv";
dotenv.config({
  quiet: true,
});

export const SERVER_PORT = process.env.PORT;
