const express = require("express");
const file = require("./routes/files");
const dotenv = require("dotenv").config();
const path = require("path");
const PORT = process.env.PORT || 13012;
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const requestLogger = require("./middleware/requestLogger");
const securityLogger = require("./middleware/securityLogger");
const errorLogger = require("./middleware/errorLogger");

const allowedOrigins = [
  "http://localhost:3000",
  "https://nucleus.sale",
  "http://localhost:3004",
  "https://backend.paylinkly.com",
  "https://front.invader.shop",
  "http://localhost:13002",
  "http://localhost:13012",
  "http://localhost:10001",
  "https://staging.invader.shop",
  "https://back.invader.shop/api/upload",
  "https://xback.tfgsolutions.pk",
  "https://xback.tfgsolutions.pk/api/upload",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders:
      "Content-Type,x-token,x-change-password-token,x-otp-token,x-user-token, x-finger-print",
    credentials: true,
  })
);

// Configure the limit for JSON request bodies
app.use(express.json({ limit: "50mb" }));

// Increase the limit for URL-encoded request bodies (if you use them)
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Logging middleware
app.use(requestLogger);
app.use(securityLogger);

app.use("/testing-purposes", (req, res) => {
  res.send("Testing purposes only");
});
app.use("/api", file);
app.use("/public", express.static(path.join(__dirname, "public")));

// Error logging middleware (must be after routes)
app.use(errorLogger);

// Server memory monitoring

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

app.listen(PORT, () => {
  logger.info(`Server started successfully on port ${PORT}`);
  console.log(`Port running successfully on ${PORT}`);
});
