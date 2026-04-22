/**
 * custom class error to sent the error with message and statusCode
 */
export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
