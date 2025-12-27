const cloudinary = require("../config/cloudinary");

const deleteOnCloudinary = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    // console.log("Cloudinary delete error: ", error);
    throw new Error("Failed to delete image from Cloudinary");
  }
};

module.exports = deleteOnCloudinary;
