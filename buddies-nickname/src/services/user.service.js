import AppError from "../errors/AppError.js";
import User from "../schemas/user.schema.js";
/**
 * to fetch the user's details
 * @param {*} userId of user need to fetch
 * @returns user's data
 */
export const fetchUser = async ({userId}) => {
  const user = await User.findOne({
    _id: userId,
    isActive: true,
  }).populate("buddies");
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return {
    message: "user successfully fetched",
    data: user,
    statusCode: 200,
  };
};
/**
 * to update the user's details
 * @param {*} userId of the user needs to update
 * @param {*} nickName of the user needs to update
 * @param {*} hobbies of the user need to update
 * @returns response Object
 */
export const updateUser = async ({userId, nickName, hobbies}) => {
  const user = await User.findOne({
    _id: userId,
    isActive: true,
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  if (nickName !== undefined) user.nickName = nickName;
  if (hobbies !== undefined) user.hobbies = hobbies;
  await user.save();
  return {
    message: "User updated successfully",
    statusCode: 200,
  };
};

/**
 * to soft delete the user
 * @param {*} userId of the user need to delete(Soft delete)
 * @returns response Object
 */
export const deleteUser = async ({userId}) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  user.isActive = false;
  await user.save();
  return {
    message: "User deleted successfully",
    statusCode: 200,
  };
};
