// Import required modules
const express = require("express");
const morgan = require("morgan"); // Optional: to log HTTP requests
const mongoose = require("mongoose"); // Ensure you import mongoose correctly
const dotenv = require("dotenv"); // For loading environment variables

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Check if the URL is loaded correctly
console.log("MongoDB URL:", process.env.url);

// Connect to MongoDB and start server after successful connection
mongoose
  .connect(process.env.url) // Removed deprecated options
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Middleware: Use Morgan for logging HTTP requests (optional)
app.use(morgan("dev"));

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Define the port and start the server
const port = 3000; // Or any port of your choice
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
