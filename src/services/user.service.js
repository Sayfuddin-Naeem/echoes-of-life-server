const User = require("../models/user.model");
const assertOwnership = require("../utils/ownershipGuard");

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

const getUserByFirebaseUid = async (firebaseUid, requester) => {
  const user = await User.findOne({ firebaseUid });

  assertOwnership({
    resource: user,
    ownerField: "_id",
    requesterId: requester._id,
    requesterRole: requester.role,
    allowAdmin: false,
  });

  return user;
};

module.exports = {
  registerUser,
  getUserByFirebaseUid,
};
