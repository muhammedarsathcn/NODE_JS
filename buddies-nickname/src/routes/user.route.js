import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import {
  fetchSingleUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
const routes = express.Router();

routes.get("/:id", verifyToken, fetchSingleUser);
routes.patch("/:id", verifyToken, updateUser);
routes.delete("/:id", verifyToken, deleteUser);

export default routes;
