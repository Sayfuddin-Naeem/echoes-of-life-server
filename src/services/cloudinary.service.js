const cloudinary = require("../config/cloudinary");
const AppError = require("../utils/AppError");

const uploadImageToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "life-lesson-app" },
      (error, result) => {
        if (error) {
          return reject(
            new AppError("Failed to upload image to Cloudinary", 500)
          );
        }

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
};

module.exports = {
  uploadImageToCloudinary,
};
