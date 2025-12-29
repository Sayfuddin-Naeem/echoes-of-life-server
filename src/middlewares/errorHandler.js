const AppError = require("../utils/AppError");

module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

   if (!err.isOperational) {
    error = new AppError("Something went wrong", 500);
  }

  // Invalid MongoDB ID
  if (err.name === "CastError") {
    error = new AppError("Invalid ID format", 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(e => e.message);
    error = new AppError(messages.join(", "), 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new AppError(`${field} already exists`, 409);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message,
  });
};
