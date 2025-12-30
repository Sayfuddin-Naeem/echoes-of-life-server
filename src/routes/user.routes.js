const express = require("express");
const userRouter = express.Router();
const { createUser, getUserById } = require("../controllers/user.controller");
const verifyFirebaseToken = require("../middlewares/auth.middleware");

// Routes
userRouter.post("/", createUser);
userRouter.get("/:id", verifyFirebaseToken, getUserById);

module.exports = userRouter;
