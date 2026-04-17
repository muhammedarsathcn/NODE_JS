import express from "express";
import fs from "fs";
import path from "path";
import { PORT } from "./configs/env.config.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import buddiesRoutes from "./routes/buddies.route.js";
import { getDirName } from "./utils/fileHandler.util.js";

// initialize and adding required middlewares 
const app = express();
app.use(express.json());

// file creation 
const __dirname = getDirName(import.meta.url);
const filePath = path.join(__dirname, "/data", "cdw_ace26_buddies.json");
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  console.log("File created successfully");
}

//routes
app.use("/buddies", buddiesRoutes);

//global error handling middleware
app.use(globalErrorHandler);

//server listen
const port = PORT || 3000;
app.listen(port, () => {
  console.log(`Server is live on http://localhost:${3000}`);
});
