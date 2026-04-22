import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from "../configs/env.config.js";

/**
 * to generate token for given payload
 * @param {*} payload need to convert into jwt token
 * @returns string which is the JWT Token
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
};
