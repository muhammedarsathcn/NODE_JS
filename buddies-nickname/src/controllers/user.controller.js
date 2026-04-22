import logger from "../configs/logger.config.js";
import AppError from "../errors/AppError.js";
import { successResponse } from "../middlewares/globalResponse.middleware.js";
import {
  fetchUser,
  updateUser as userUpdate,
  deleteUser as userDelete,
} from "../services/user.service.js";

/**
 *to fetch data of the particular user
 * @param {*} req from the user
 * @param {*} res from the server
 * @param {*} next to access the middleware
 * @returns response of message, data, successCode
 */
export const fetchSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.id !== id) {
      throw new AppError("You are unauthorized",403)
    }
    if (!id) {
      throw new AppError("User id is missing", 400);
    }
    const response = await fetchUser(id);
    return successResponse(
      res,
      response.message,
      response.data,
      response.statusCode,

    );
  } catch (err) {
    logger.error("Fetching user failed", {
      message: err.message,
    });
    next(err);
  }
};

/**
 *to update the user data 
 * @param {*} req from the user
 * @param {*} res from the server
 * @param {*} next to access the middleware
 * @returns response of message, data, successCode
 */
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new AppError("id is missing", 400);
    }
    const response = await userUpdate({...req.body, userId:id});

    return successResponse(
      res,
      response.message,
      response.data,
      response.statusCode,
    );
  } catch (err) {
    logger.error("Fetching user failed", {
      message: err.message,
    });
    next(err);
  }
};

/**
 *to soft delete the user
 * @param {*} req from the user
 * @param {*} res from the server
 * @param {*} next to access the middleware
 * @returns response of message, data, successCode
 */
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new AppError("id is required", 400);
    }

    const response = await userDelete({userId:id});
    return successResponse(res, response.message, response.message);
  } catch (err) {
    logger.error("User Deletion failed", {
      message: err.message,
    });
    next(err);
  }
};
