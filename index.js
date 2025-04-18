const express = require("express");
const file = require("./routes/files");
const dotenv = require("dotenv").config();
const path = require("path");
const PORT = process.env.PORT;
const app = express();
const cors = require("cors");

const allowedOrigins = ["http://localhost:3000", "https://crm.paylinkly.com"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,x-token",
  })
);

// Configure the limit for JSON request bodies
app.use(express.json({ limit: "50mb" }));

// Increase the limit for URL-encoded request bodies (if you use them)
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api", file);
app.use("/public", express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Port running successfully on ${PORT}`);
});
