const express = require("express");
const file = require("./routes/files");
const dotenv = require("dotenv").config();
const path = require("path");
const PORT = process.env.PORT;
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,x-token",
  })
);
app.use(express.json());

app.use("/api", file);
app.use("/public", express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Port running successfully on ${PORT}`);
});
