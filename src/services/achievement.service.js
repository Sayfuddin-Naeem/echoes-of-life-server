const User = require("../models/user.model");
const achievements = require("../config/achievements");
const logActivity = require("../utils/activityLogger");

const checkAndUnlockAchievements = async (userId) => {
  const user = await User.findById(userId);
  if (!user) return;

  const earnedKeys = new Set(user.achievements.map((a) => a.key));
  let unlocked = [];

  for (const achievement of achievements) {
    if (
      !earnedKeys.has(achievement.key) &&
      achievement.condition(user.stats)
    ) {
      user.achievements.push({
        key: achievement.key,
        title: achievement.title,
        description: achievement.description,
        icon: achievement.icon,
        earnedAt: new Date(),
      });

      unlocked.push(achievement);
    }
  }

  if (unlocked.length === 0) return;

  await user.save();

  // Log AFTER save
  for (const achievement of unlocked) {
    logActivity({
      userId,
      type: "achievement",
      action: `Unlocked achievement: ${achievement.title}`,
    });
  }
};

module.exports = checkAndUnlockAchievements;