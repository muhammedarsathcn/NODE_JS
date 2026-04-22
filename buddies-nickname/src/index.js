import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./configs/database.config.js";
import { PORT } from "./configs/env.config.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import userRoutes from "./routes/user.route.js";
import requestLoggerMiddleware from "./middlewares/requestLogger.middleware.js";
// making connection with database
connectDb();
// initialize and adding required middlewares
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(requestLoggerMiddleware);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
//routes
app.use("/admin/users", adminRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

//global error handling middleware
app.use(globalErrorHandler);

//server listen
app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});
