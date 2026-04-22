import bcrypt from "bcrypt";

/**
 * to create hashed password
 * @param {*} password need to be hashed
 * @param {*} rounds the password need to hash
 * @returns hashedPassword for the given password with the provided rounds
 */
export const hashPassword = async (password, rounds) => {
  return await bcrypt.hash(password, rounds);
};

/**
 * to compare the entered and already hashed password
 * @param {*} hashedPassword from the database
 * @param {*} enteredPassword is the password entered by the user
 * @returns boolean
 */
export const comparePassword = async (hashedPassword, enteredPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};
