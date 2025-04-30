// src/index.js
const express = require("express");
const morgan = require("morgan"); // Optional: to log HTTP requests
const app = express();
const port = 3000;

// Use Morgan for logging HTTP requests (optional)
app.use(morgan("dev"));

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
