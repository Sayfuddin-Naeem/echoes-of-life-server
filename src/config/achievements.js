module.exports = [
  {
    key: "first_lesson",
    title: "First Lesson",
    description: "Created your first lesson",
    icon: "book-open",
    condition: (stats) => stats.totalLessons >= 1,
  },
  {
    key: "five_lessons",
    title: "Lesson Explorer",
    description: "Created 5 lessons",
    icon: "library",
    condition: (stats) => stats.totalLessons >= 5,
  },
  {
    key: "ten_lessons",
    title: "Wisdom Builder",
    description: "Created 10 lessons",
    icon: "graduation-cap",
    condition: (stats) => stats.totalLessons >= 10,
  },
  {
    key: "twenty_lessons",
    title: "Life Mentor",
    description: "Created 20 lessons",
    icon: "chalkboard-teacher",
    condition: (stats) => stats.totalLessons >= 20,
  },
  {
    key: "first_like",
    title: "First Like",
    description: "Received your first like",
    icon: "thumbs-up",
    condition: (stats) => stats.totalLikes >= 1,
  },
  {
    key: "ten_likes",
    title: "Crowd Favorite",
    description: "Received 10 likes",
    icon: "trending-up",
    condition: (stats) => stats.totalLikes >= 10,
  },
  {
    key: "first_favorite",
    title: "First Favorite",
    description: "Someone favorited your lesson",
    icon: "heart",
    condition: (stats) => stats.totalFavorites >= 1,
  },
  {
    key: "ten_favorites",
    title: "Highly Valued",
    description: "Received 10 favorites",
    icon: "bookmark",
    condition: (stats) => stats.totalFavorites >= 10,
  },
  {
    key: "first_comment",
    title: "First Comment",
    description: "Posted your first comment",
    icon: "message-circle",
    condition: (stats) => stats.totalComments >= 1,
  },
  {
    key: "five_comments",
    title: "Conversation Starter",
    description: "Posted 5 comments",
    icon: "messages-square",
    condition: (stats) => stats.totalComments >= 5,
  },
  {
    key: "twenty_comments",
    title: "Community Voice",
    description: "Posted 20 comments",
    icon: "megaphone",
    condition: (stats) => stats.totalComments >= 20,
  },
  {
    key: "power_user",
    title: "Power User",
    description: "Highly active across lessons and engagement",
    icon: "shield-check",
    condition: (stats) =>
      stats.totalLessons >= 5 &&
      stats.totalLikes >= 10 &&
      stats.totalComments >= 5,
  },
];
