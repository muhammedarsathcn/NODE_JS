/**
 * 
 * @param {*} err is the current error
 * @param {*} req from the client
 * @param {*} res from the server
 * @param {*} next to goto the next mi
 */
export const globalErrorHandler = (err, req, res, next) => {
 const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
