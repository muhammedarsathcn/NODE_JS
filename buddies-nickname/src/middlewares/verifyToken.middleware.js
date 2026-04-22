import jwt from "jsonwebtoken";
import AppError from "../errors/AppError.js";
import { JWT_SECRET_KEY } from "../configs/env.config.js";
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies?.jwtToken;
    if (!token) {
      throw new AppError("Token is missing", 401);
    }
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

export const verifyAdmin = async (req, res, next) => {

  try {
    const user = req.user;
    if (user.role !== "ADMIN") {
      throw new AppError("You are unauthorized", 403);
    }
    next();
  } catch (err) {
    next(err);
  }
};
