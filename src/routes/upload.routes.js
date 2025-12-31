const express = require("express");
const upload = require("../middlewares/multer.middleware");
const { uploadImage } = require("../controllers/upload.controller");
const validateFile = require("../middlewares/validateFile");

const uploadRouter = express.Router();

uploadRouter.post("/image", upload.single("image"), validateFile, uploadImage);

module.exports = uploadRouter;
