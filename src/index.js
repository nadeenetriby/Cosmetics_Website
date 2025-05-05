// Import required modules
const express = require("express");
const morgan = require("morgan"); // Optional: to log HTTP requests
const mongoose = require("mongoose"); // Ensure you import mongoose correctly
const dotenv = require("dotenv"); // For loading environment variables

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = 3000;
console.log(process.env.url);
// Connect to MongoDB and start server after successful connection
mongoose.connect(process.env.url).then(console.log("db")).catch("error");

// Middleware: Use Morgan for logging HTTP requests (optional)
app.use(morgan("dev"));

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});
