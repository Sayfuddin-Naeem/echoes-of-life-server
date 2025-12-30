const firebaseAdmin = require("../config/firebase");
const User = require("../models/user.model");
const AppError = require("../utils/AppError");

const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("No token provided", 401));
    }

    const token = authHeader.split(" ")[1];
    const decoded = await firebaseAdmin.auth().verifyIdToken(token);

    const user = await User.findOne({ firebaseUid: decoded.uid });
    if (!user) {
      return next(
        new AppError(
          "User exists in Firebase but not registered in backend",
          404
        )
      );
    }

    req.user = {
      _id: user._id,
      firebaseUid: user.firebaseUid,
      role: user.role || "user",
    };

    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", 401));
  }
};

module.exports = verifyFirebaseToken;
