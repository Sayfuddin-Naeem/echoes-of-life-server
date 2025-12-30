const User = require("../models/user.model");

const registerUser = async (userData) => {
  const existingUser = await User.findOne({
    firebaseUid: userData.firebaseUid,
  });

  if (existingUser) {
    return { user: existingUser, created: false };
  }

  const user = await User.create(userData);

  return { user, created: true };
};

module.exports = {
  registerUser,
};
