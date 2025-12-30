const multer = require("multer");
const AppError = require("./AppError");

const multerErrorAdapter = (err) => {
  if (!(err instanceof multer.MulterError)) return err;

  let message = "File upload error";
  let statusCode = 400;

  switch (err.code) {
    case "LIMIT_FILE_SIZE":
      message = "File size is too large";
      break;

    case "LIMIT_FILE_COUNT":
      message = "Too many files uploaded";
      break;

    case "LIMIT_UNEXPECTED_FILE":
      message = "Unexpected file field";
      break;

    default:
      message = err.message;
  }

  return new AppError(message, statusCode);
};

module.exports = multerErrorAdapter;
