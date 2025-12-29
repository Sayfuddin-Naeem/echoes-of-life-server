const User = require("../models/user.model");

const logActivity = async ({
  userId,
  type,
  action,
  referenceId = null,
}) => {
  if (!userId) return;

  const newActivity = {
    type,
    action,
    referenceId,
  };

  await User.findByIdAndUpdate(userId, {
    $push: {
      recentActivity: {
        $each: [newActivity],
        $slice: -20,
      },
    },
  });
};

module.exports = logActivity;