import express from "express";
import cors from "cors";
import { connectDb } from "./configs/database.config.js";
import { PORT } from "./configs/env.config.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import buddiesRoutes from "./routes/buddies.route.js";
import requestLoggerMiddleware from "./middlewares/requestLogger.middleware.js";

// // making connection with database
connectDb();

// initialize and adding required middlewares
const app = express();
app.use(express.json());
app.use(requestLoggerMiddleware);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
//routes
app.use("/buddies", buddiesRoutes);

//global error handling middleware
app.use(globalErrorHandler);

//server listen
app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});
