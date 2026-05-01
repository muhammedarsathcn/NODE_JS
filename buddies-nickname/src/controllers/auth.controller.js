import logger from "../configs/logger.config.js";
import { createUser, loginUser, logout } from "../services/auth.service.js";
import { successResponse } from "../middlewares/globalResponse.middleware.js";
import AppError from "../errors/AppError.js";
import { NODE_ENV } from "../configs/env.config.js";
/**
 * to create a new User
 * @param {*} req from the user
 * @param {*} res from the server
 * @param {*} next to access the middleware
 * @returns response of message, data, successCode
 */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.params;
    if (!name || !email || !password) {
      throw new AppError("Required fields are missing", 400);
    }
    const response = await createUser({...req.body, id});
    return successResponse(res, response);
  } catch (err) {
    logger.error("Creating new User Failed", {
      message: err.message,
    });
    next(err);
  }
};

/**
 * to sign in a User
 * @param {*} req from the user
 * @param {*} res from the server
 * @param {*} next to access the middleware
 * @returns response of message, data, successCode
 */
export const signinUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError("Required fields are missing", 400);
    }
    const response = await loginUser(email, password);
    const environment = NODE_ENV;
    res.cookie("token", response.data.token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: environment === "production" ? true : false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return successResponse(res, response.message,response.data, response.statusCode);
  } catch (err) {
    logger.error("Signin failed", {
      message: err.message,
    });
    next(err);
  }
};

/**
 *  to sign out a User
 * @param {*} req from the user
 * @param {*} res from the server
 * @param {*} next to access the middleware
 * @returns response of message, data, successCode
 */
export const signOut = (req, res, next) => {
  try {
    const response = logout(res);
    return successResponse(res, response.message, response.statusCode);
  } catch (err) {
    logger.error("Logout Failed", {
      message: err.message,
    });
    next(err);
  }
};
