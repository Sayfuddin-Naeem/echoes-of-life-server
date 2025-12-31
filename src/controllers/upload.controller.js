const { uploadImageToCloudinary } = require("../services/cloudinary.service");
const AppError = require("../utils/AppError");

// upload image to cloudinary
exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError("No file uploaded", 400);
    }

    const image = await uploadImageToCloudinary(req.file.buffer);

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: image,
    });
  } catch (error) {
    next(error);
  }
};
