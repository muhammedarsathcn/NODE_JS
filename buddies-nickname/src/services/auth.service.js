import User from "../schemas/user.schema.js";
import AppError from "../errors/AppError.js";
import { comparePassword, hashPassword } from "../utils/passwordHash.utils.js";
import { generateToken } from "../utils/jwtHandler.utils.js";
import { NODE_ENV } from "../configs/env.config.js";
/**
 * to create new user
 * @param {*} name of the user
 * @param {*} email of the user
 * @param {*} password of the user
 * @returns newUser with response and statusCode
 */
export const createUser = async ({
  name,
  email,
  password,
  nickName,
  dob,
  hobbies,
  employeeId,
  id,
}) => {
  const admin = await User.findById(id);
  if (admin.role !== "ADMIN") {
    throw new AppError("You are unauthorized to create a new User", 401);
  }
  const user = await User.findOne({
    email: email,
  });
  if (user) {
    throw new AppError("User already existed", 409);
  }
  const hashedPassword = await hashPassword(password, 10);
  await User.create({
    name: name,
    email: email,
    password: hashedPassword,
    nickName,
    dob: new Date(dob),
    hobbies,
    employeeId,
  });
  return {
    message: "New user created successfully",
    statusCode: 200,
  };
};

/**
 * user to signin
 * @param {*} email of the signing user
 * @param {*} password of the signing user
 * return response with message, statuscode
 */
export const loginUser = async (email, password) => {
  const user = await User.findOne({
    email: email,
  }).select("+password");
  if (!user) {
    throw new AppError("User not existed", 404);
  }
  const hashedPassword = user.password;
  const isPasswordMatched = await comparePassword(hashedPassword, password);
  if (!isPasswordMatched) {
    throw new AppError("Invalid Credentials", 400);
  }
  const payload = {
    name: user.name,
    email: user.email,
    role: user.role,
    id:user._id
  };
  const token = generateToken(payload);
  return {
    message: "user successfully logged in",
    data: {
      token: token,
    },
    statusCode: 200,
  };
};

/**
 * to clear the cookie from the browser
 */
export const logout = async (res) => {
  const environment = NODE_ENV;
  res.clearCookie("token", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: environment === "production" ? true : false,
  });
  return {
    message: "Logged out successfully",
    statusCode: 200,
  };
};
