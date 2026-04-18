import AppError from "../errors/AppError.js";
import Buddy from "../schemas/buddies.schema.js";
/**
 *  to fetch all the buddies from the json
 * @returns list of buddies
 */
export const getAllBuddies = async () => {
  const buddies = await Buddy.find({ isActive: true });
  return buddies;
};

/**
 * to fetch the details of the particular buddy
 * @param {*} employeeId  of the employee details to fetch
 * @returns buddy detail of the particular buddy
 */
export const getBuddiesById = async (employeeId) => {
  const buddy = await Buddy.findOne({ employeeId: employeeId, isActive: true });
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
export const createBuddy = async (
  employeeId,
  realName,
  nickName,
  dob,
  hobbies,
) => {
  const exists = await Buddy.findOne({ employeeId: employeeId });
  if (exists) {
    throw new AppError("Buddy already existed", 409);
  }
  await Buddy.create({
    employeeId,
    realName,
    nickName,
    dob: new Date(dob),
    hobbies,
  });

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
export const updateBuddy = async (
  employeeId,
  realName,
  nickName,
  dob,
  hobbies,
) => {
  const updateData = {};
  if (realName !== undefined) updateData.realName = realName;
  if (nickName !== undefined) updateData.nickname = nickName; // Match schema field name
  if (dob !== undefined) updateData.dob = new Date(dob);
  if (hobbies !== undefined) updateData.hobbies = hobbies;
  if (Object.keys(updateData).length === 0) {
    throw new AppError("No valid fields provided for update", 400);
  }
  const updatedBuddy = await Buddy.findOneAndUpdate(
    { employeeId },
    { $set: updateData },
    {
      new: true,
    },
  );
  if (!updatedBuddy) {
    throw new AppError("Buddy not found", 404);
  }
  return {
    message: "Buddy data updated successfully",
    data: updatedBuddy,
    statusCode: 200,
  };
};

/**
 * to delete the buddy
 * @param {*} employeeId of the employee
 * @returns  Object with status code, message
 */
export const deleteBuddy = async (employeeId) => {
  
  const buddy = await Buddy.findOneAndUpdate(
    { employeeId },
    { $set: { isActive: false } },
  );
  if (!buddy) {
    throw new AppError("Buddy is not existed", 404);
  }
  if (!buddy.isActive) {
    throw new AppError("Buddy is already deleted",400)
  }
  return {
    message: "Buddy successfully deleted",
    statusCode: 200,
  };
};
