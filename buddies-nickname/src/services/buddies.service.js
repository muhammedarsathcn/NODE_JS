import AppError from "../errors/AppError.js";
import { successResponse } from "../middlewares/globalResponse.middleware.js";
import { readFile, writeFile } from "../utils/fileHandler.util.js";

/**
 *  to fetch all the buddies from the json
 * @returns list of buddies
 */
export const getAllBuddies = () => {
  const buddies = readFile();
  return buddies;
};

/**
 * to fetch the details of the particular buddy
 * @param {*} employeeId  of the employee details to fetch 
 * @returns buddy detail of the particular buddy
 */
export const getBuddiesById = (employeeId) => {
  const buddies = readFile();
  const buddy = buddies.find((buddy) => buddy.employeeId === employeeId);
  if (!buddy) {
    throw new AppError("Buddy not existed", 404);
  }
  return {
    message: "Buddy fetched successfully",
    data: buddy,
    statusCode: 200,
  };
};

/**
 * to create a new buddy if he didn't exist before
 * @param {*} employeeId  of the buddy
 * @param {*} realName of the buddy
 * @param {*} nickName of the buddy
 * @param {*} dob of the buddy
 * @param {*} hobbies of the buddy
 * @returns Object with status code, message
 */
export const createBuddy = (employeeId, realName, nickName, dob, hobbies) => {
  const buddies = readFile();
  const exists = buddies.find((buddy) => buddy.employeeId === employeeId);
  if (exists) {
    throw new AppError("Buddy already existed", 409);
  }
  const newBuddy = {
    id: buddies.length,
    employeeId,
    realName,
    nickName,
    dob,
    hobbies,
  };
  buddies.push(newBuddy);
  writeFile(buddies);
  return {
    message: "New employee added",
    statusCode: 201,
  };
};

/**
 * to update a existing buddy 
 * @param {*} employeeId  of the buddy
 * @param {*} realName  of the buddy
 * @param {*} nickName  of the buddy
 * @param {*} dob  of the buddy
 * @param {*} hobbies  of the buddy
 * @returns Object with status code, message
 */
export const updateBuddy = (employeeId, realName, nickName, dob, hobbies) => {
  const buddies = readFile();
  const index = buddies.findIndex((buddy) => buddy.employeeId === employeeId);
  if (index === -1) {
    throw new AppError("Buddy not existed", 404);
  }
  if (realName) {
    buddies[index].realName = realName;
  }
  if (nickName) {
    buddies[index].nickName = nickName;
  }
  if (dob) {
    buddies[index].dob = dob;
  }
  if (hobbies) {
    buddies[index].hobbies = hobbies;
  }
  writeFile(buddies);
  return {
    message: "Buddy data updated successfully",
    statusCode: 200,
  };
};

/**
 * to delete the buddy
 * @param {*} employeeId of the employee
 * @returns  Object with status code, message
 */
export const deleteBuddy = (employeeId) => {
  const buddies = readFile();
  const index = buddies.findIndex((buddy) => buddy.employeeId === employeeId);
  if (index === -1) {
    throw new AppError("Buddy not existed", 404);
  }
  buddies.splice(index, 1);
  writeFile(buddies);
  return {
    message: "Buddy successfully deleted",
    statusCode: 200,
  };
};
