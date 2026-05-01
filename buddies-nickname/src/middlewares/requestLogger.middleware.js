import logger from "../configs/logger.config.js";

/**
 * 
 * @param {*} req from the client 
 * @param {*} res from the server
 * @param {*} next to called the middleware
 */
const requestLogger = (req, res, next) => {
  logger.info("Incoming Request", {
    method: req.method,
    url: req.url,
    ip: req.ip,
  });
  next();
};
export default requestLogger;