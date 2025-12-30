const { z } = require("zod");

const fileSchema = z
  .object({
    mimetype: z.string(),
    size: z.number(),
  })
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype),
    {
      message: "Only JPG, PNG, WEBP allowed",
      path: ["mimetype"],
    }
  )
  .refine(
    (file) => file.size <= 2 * 1024 * 1024,
    {
      message: "File size must be under 2MB",
      path: ["size"],
    }
  );

module.exports = fileSchema;
