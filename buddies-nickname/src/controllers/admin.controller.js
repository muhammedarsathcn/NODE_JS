import logger from "../configs/logger.config.js";
import AppError from "../errors/AppError.js";
import { successResponse } from "../middlewares/globalResponse.middleware.js";
import {
  assignBuddies,
  fetchAllUsers,
  deleteUser,
} from "../services/admin.service.js";

/**
 *  to assign buddies to a user
 * @param {*} req from the user
 * @param {*} res from the server
 * @param {*} next to access the middleware
 * @returns response of message, data, successCode
 */
export const buddyAssigning = async (req, res, next) => {
  try {
    const { userId, buddyId } = req.body;
    if (!userId || !buddyId) {
      throw new AppError("Both UserId and BuddyId required", 400);
    }
    const response = await assignBuddies(userId, buddyId);
    return successResponse(res, response.message, response.statusCode);
  } catch (err) {
    logger.error("Buddy assigning failed", {
      message: err.message,
    });
    next(err);
  }
};

/**
 *  to fetch all users
 * @param {*} req from the user
 * @param {*} res from the server
 * @param {*} next to access the middleware
 * @returns response of message, data, successCode
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const response = await fetchAllUsers();
    return successResponse(
      res,
      response.message,
      response.data,
      response.statusCode,
    );
  } catch (err) {
    logger.error("Fetching all users failed", {
      message: err.message,
    });
    next(err);
  }
};

/**
 *  to hard delete a user only by admin
 * @param {*} req from the user
 * @param {*} res from the server
 * @param {*} next to access the middleware
 * @returns response of message, data, successCode
 */
export const userDelete = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      throw new AppError("User id is required", 400);
    }
    const response = await deleteUser(userId);
    return successResponse(res, response.message, response.statusCode);
  } catch (err) {
    logger.error("Fetching all users failed", {
      message: err.message,
    });
    next(err);
  }
};
