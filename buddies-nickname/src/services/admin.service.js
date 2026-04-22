import AppError from "../errors/AppError.js";
import User from "../schemas/user.schema.js";

/**
 * function to assign Buddies to a user
 * @param {*} userId of the user
 * @param {*} buddyId of the buddy
 * @returns  response of message and statusCode
 */
export const assignBuddies = async (userId, buddyId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User is not existed", 404);
  }
  if (user.buddies.includes(buddyId)) {
    throw new AppError("Buddy is already in the list", 400);
  }
  user.buddies.push(buddyId);
  await user.save();

  return {
    message: "New buddy successfully added",
    statusCode: 200,
  };
};

/**
 * to get entire user list with their buddies
 * @returns list of all users
 */
export const fetchAllUsers = async () => {
  const users = await User.find().populate("buddies");
  return {
    message: "All users fetched successfully",
    data: users,
    statusCode: 200,
  };
};

/**
 * to delete the user from the db by admin
 * @param {*} userId of the user need to delete
 * @returns response with message and statuscode
 */
export const deleteUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User is not existed", 404);
  }
  await User.updateMany({ buddies: userId }, { $pull: { buddies: userId } });
  await User.findByIdAndDelete(userId);
  return {
    message: "User deleted successfully",
    statusCode: 200,
  };
};
