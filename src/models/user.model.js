const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    displayName: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    photoURL: String,
    cloudinary_public_id: String,

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isPremium: {
      type: Boolean,
      default: false,
    },

    stats: {
      totalLessons: { type: Number, default: 0 },
      totalFavorites: { type: Number, default: 0 },
      totalLikes: { type: Number, default: 0 },
      totalComments: { type: Number, default: 0 },
    },

    achievements: [
      {
        key: { type: String, required: true },
        title: { type: String, required: true },
        description: String,
        icon: String,
        earnedAt: { type: Date, default: Date.now },
      },
    ],

    recentActivity: [
      {
        type: {
          type: String,
          enum: ["lesson", "favorite", "comment", "like", "achievement"],
          required: true,
        },
        action: { type: String, required: true },
        referenceId: {
          type: mongoose.Schema.Types.ObjectId,
          default: null,
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
