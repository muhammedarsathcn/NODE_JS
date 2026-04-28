import logger from "../configs/logger.config.js";

const requestLogger = (req, res, next) => {
  logger.info("Incoming Request", {
    method: req.method,
    url: req.url,
    ip: req.ip,
  });
  next();
};
export default requestLogger;