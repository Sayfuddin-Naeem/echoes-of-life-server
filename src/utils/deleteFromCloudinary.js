const cloudinary = require("../config/cloudinary");
const AppError = require("./AppError");

const deleteFromCloudinary = async (publicId) => {
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    throw new AppError("Failed to delete image", 500);
  }
};

module.exports = deleteFromCloudinary;
