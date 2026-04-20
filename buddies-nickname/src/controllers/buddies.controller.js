import {
  getAllBuddies,
  getBuddiesById,
  createBuddy,
  updateBuddy,
  deleteBuddy,
} from "../services/buddies.service.js";
import { successResponse } from "../middlewares/globalResponse.middleware.js";
import AppError from "../errors/AppError.js";

/**
 * @path http://localhost:3000/buddies (GET)
 * @param {*} req  from the client
 * @param {*} res from the server
 * @returns buddies from the json
 */
export const allBuddies = (req, res) => {
  const buddies = getAllBuddies();
  return successResponse(res, "All buddies fetched successfully", buddies, 200);
};

/**
 * @path http://localhost:3000/buddies/:employeeId(GET)
 * @param {*} req  from the client
 * @param {*} res from the server
 * @param {*} next to call the next error middleware
 * @returns buddies from the json
 */
export const getBuddyById = (req, res, next) => {
  try {
    const { employeeId } = req.params;
    if (!employeeId) {
      throw new AppError("EmployeeId is required", 400);
    }
    const response = getBuddiesById(employeeId);
    return successResponse(res, response);
  } catch (err) {
    next(err);
  }
};

/**
 * @path http://localhost:3000/buddies(POST)
 * @param {*} req  from the client
 * @param {*} res from the server
 * @param {*} next to call the next error middleware
 * @returns buddies from the json
 */
export const createNewBuddy = (req, res, next) => {
  try {
    const { employeeId, realName, nickName, dob, hobbies } = req.body;
    const response = createBuddy(employeeId, realName, nickName, dob, hobbies);
    return successResponse(res, response.message, response.statusCode);
  } catch (err) {
    next(err);
  }
};

/**
 * @path http://localhost:3000/buddies/:employeeId(PATCH)
 * @param {*} req  from the client
 * @param {*} res from the server
 * @param {*} next to call the next error middleware
 * @returns buddies from the json
 */
export const updateExistingBuddy = (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const { realName, nickName, dob, hobbies } = req.body;
    if (!realName && !nickName && !dob && !hobbies) {
      throw new AppError(" All field should not be empty", 400);
    }
    if (!employeeId) {
      throw new AppError("EmployeeId is required", 400);
    }
    const response = updateBuddy(employeeId, realName, nickName, dob, hobbies);
    return successResponse(res, response);
  } catch (err) {
    next(err);
  }
};

/**
 * @path http://localhost:3000/buddies/:employeeId(DELETE)
 * @param {*} req  from the client
 * @param {*} res from the server
 * @param {*} next to call the next error middleware
 * @returns buddies from the json
 */
export const deleteExistingBuddy = (req, res, next) => {
  try {
    const { employeeId } = req.params;
    if (!employeeId) {
      throw new AppError("EmployeeId is required", 400);
    }
    const response = deleteBuddy(employeeId);
    return successResponse(res, response);
  } catch (err) {
    next(err);
  }
};
