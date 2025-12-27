const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
// Routers


const app = express();
app.set("trust proxy", 1);

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Connect DB
connectDB();

// api routes
// app.use("/api/auth", authRouter);
// app.use("/api/users", userRouter);
// app.use("/api/comments", commentRouter);
// app.use("/api/uploads", uploadRouter);
// app.use("/api/favorites", favoriteRouter);
// app.use("/api/hero-slides", heroSlideRouter);

app.get("/", (req, res) => {
  res.status(200).send("Local Bite API is running with mongoose");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// DB connection and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
