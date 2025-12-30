const AppError = require("../utils/AppError");
const fileSchema = require("../validators/file.schema");

const validateFile = (req, res, next) => {
  if (!req.file) {
    return next(new AppError("File is required", 400));
  }

  const result = fileSchema.safeParse({
    mimetype: req.file.mimetype,
    size: req.file.size,
  });

  if (!result.success) {
    return next(result.error, 400);
  }

  next();
};

module.exports = validateFile;
