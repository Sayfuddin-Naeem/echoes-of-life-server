const AppError = require("./AppError");
const { ZodError } = require("zod");

const zodErrorAdapter = (err) => {
  if (!(err instanceof ZodError)) return err;

  const message = err.errors
    .map(e => e.message)
    .join(", ");

  return new AppError(message, 400);
};

module.exports = zodErrorAdapter;
