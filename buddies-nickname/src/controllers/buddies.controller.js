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
 * @param {*} next to call the next error middleware
 * @returns buddies from the json
 */
export const allBuddies = async (req, res) => {
  const buddies = await getAllBuddies();
  return successResponse(res, "All buddies fetched successfully", buddies, 200);
};

/**
 * @path http://localhost:3000/buddies/:employeeId(GET)
 * @param {*} req  from the client
 * @param {*} res from the server
 * @returns buddies from the json
 */
export const getBuddyById = async (req, res) => {
  const { employeeId } = req.params;
  if (!employeeId) {
    throw new AppError("EmployeeId is required", 400);
  }
  const response = await getBuddiesById(employeeId);
  return successResponse(res, response);
};

/**
 * @path http://localhost:3000/buddies(POST)
 * @param {*} req  from the client
 * @param {*} res from the server
 * @returns buddies from the json
 */
export const createNewBuddy = async (req, res) => {
  const { employeeId, realName, nickName, dob, hobbies } = req.body;
  const response = await createBuddy(
    employeeId,
    realName,
    nickName,
    dob,
    hobbies,
  );
  return successResponse(res, response);
};

/**
 * @path http://localhost:3000/buddies/:employeeId(PATCH)
 * @param {*} req  from the client
 * @param {*} res from the server
 * @returns buddies from the json
 */
export const updateExistingBuddy = async (req, res) => {
  const { employeeId } = req.params;
  const { realName, nickName, dob, hobbies } = req.body;
  if (
    realName === undefined &&
    nickName === undefined &&
    dob === undefined &&
    hobbies === undefined
  ) {
    throw new AppError("At least one field must be provided for update", 400);
  }
  if (!employeeId) {
    throw new AppError("EmployeeId is required", 400);
  }
  const response = await updateBuddy(
    employeeId,
    realName,
    nickName,
    dob,
    hobbies,
  );
  return successResponse(
    res,
    response.message,
    response.data,
    response.statusCode,
  );
};

/**
 * @path http://localhost:3000/buddies/:employeeId(DELETE)
 * @param {*} req  from the client
 * @param {*} res from the server
 * @returns buddies from the json
 */
export const deleteExistingBuddy = async (req, res) => {
  const { employeeId } = req.params;
  if (!employeeId) {
    throw new AppError("EmployeeId is required", 400);
  }
  const response = await deleteBuddy(employeeId);
  return successResponse(res, response);
};
