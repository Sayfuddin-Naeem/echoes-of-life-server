const AppError = require("./AppError");

const assertOwnership = ({
  resource,
  ownerField = "user",
  requesterId,
  allowAdmin = true,
  requesterRole,
}) => {
  if (!resource) {
    throw new AppError("Resource not found", 404);
  }

  const ownerId =
    typeof resource[ownerField] === "object"
      ? resource[ownerField]._id
      : resource[ownerField];

  if (!ownerId) {
    throw new AppError("Ownership field missing", 500);
  }

  // Admin bypass
  if (allowAdmin && requesterRole === "admin") return true;

  if (ownerId.toString() !== requesterId.toString()) {
    throw new AppError("Unauthorized access", 403);
  }

  return true;
};

module.exports = assertOwnership;
