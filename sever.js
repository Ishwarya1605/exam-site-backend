const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

// Import routes
const authRoutes = require('./routes/authRoutes');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Must be before routes
app.use("/api/auth", authRoutes);

// Database connection
connectDB();



// Health check route
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running successfully!" });
});

// 404 handler (fixed)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
});
