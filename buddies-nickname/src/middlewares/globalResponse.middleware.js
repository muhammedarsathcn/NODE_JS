/**
 * success response for overall project
 * @param {*} res to send the response to the client
 * @param {*} message of the current response
 * @param {*} data of the current response
 * @param {*} statusCode of the current response
 * @returns Response Object
 */
export const successResponse = (res, message, data, statusCode = 200) => {
  const response = {
    success: true,
    message: message,
  };
  if (data !== null) {
    response.data = data;
  }
  return res.status(statusCode).json(response);
};

/**
 * error response for the overall project
 * @param {*} res to send the error response to the client
 * @param {*} message of the error
 * @param {*} statusCode of that error
 * @returns  Response object
 */
export const errorResponse = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
