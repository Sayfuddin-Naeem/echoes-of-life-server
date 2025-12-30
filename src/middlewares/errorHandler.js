const AppError = require("../utils/AppError");
const zodErrorAdapter = require("../utils/zodErrorAdapter");
const multerErrorAdapter = require("../utils/multerErrorAdapter");

module.exports = (err, req, res, next) => {
  let error = err;
  
  // Adapter
  error = zodErrorAdapter(error);
  error = multerErrorAdapter(error);

  // Invalid MongoDB ID
  if (error.name === "CastError") {
    error = new AppError("Invalid ID format", 400);
  }

  // Mongoose validation error
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((e) => e.message);
    error = new AppError(messages.join(", "), 400);
  }

  // Duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    error = new AppError(`${field} already exists`, 409);
  }

  // Unknown / programming errors
  if (!error.isOperational) {
    console.error("🔥 UNEXPECTED ERROR:", error);
    error = new AppError("Something went wrong", 500);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message,
  });
};
