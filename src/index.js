// Import required modules
const express = require("express");
const morgan = require("morgan"); // Optional: to log HTTP requests
const mongoose = require("mongoose"); // Ensure you import mongoose correctly
const dotenv = require("dotenv"); // For loading environment variables
const userRoutes = require("./routes/users"); // Import user routes
const admin = require("./Admin/admin");

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
    admin();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Middleware: Use Morgan for logging HTTP requests (optional)
app.use(morgan("dev"));

// Middleware: Parse JSON bodies
app.use(express.json()); // This middleware is crucial for handling POST/PUT requests with JSON data

// Use user routes for user-related API endpoints
app.use("/api/user", userRoutes);

// Basic route (optional, for testing purposes)
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 8080; // Or any port of your choice
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
