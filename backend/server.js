
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Create an Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
     res.send("Club Recruitment Portal API is running!");
});

// Health check route
app.get("/api/health", (req, res) => {
     res.json({
          success: true,
          message: "Backend server is healthy!"
     });
});

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
     console.log(`Server running on http://localhost:${PORT}`);
});
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const applicationRoutes = require("./routes/applicationRoutes");
app.use("/api/applications", applicationRoutes);