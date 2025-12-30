const User = require("../models/user.model");
const userService = require("../services/user.service");

// Create user
exports.createUser = async (req, res, next) => {
  try {
    const { user, created } = await userService.registerUser(req.body);

    res.status(created ? 201 : 200).json({
      success: true,
      message: created ? "User created successfully" : "User already exists",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Get user by id
exports.getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserByFirebaseUid(
      req.params.id,
      req.user
    );

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
