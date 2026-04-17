import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * To find the directory name of the required file
 * @param {*} metaUrl url of the required file
 * @returns directory name of that file
 */
export const getDirName = (metaUrl) => {
  return path.dirname(fileURLToPath(metaUrl));
};

const __dirname = getDirName(import.meta.url);
const filePath = path.join(__dirname, "../data", "cdw_ace26_buddies.json");

/**
 * function to read the data
 * @returns cdw_ace26_buddies.json
 */
export const readFile = () => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

/**
 * function to upsert the data
 * @param {*} data to change in the file
 */
export const writeFile = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
