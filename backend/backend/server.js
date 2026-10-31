require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(",").map((item) => item.trim())
    : true
}));
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.send("Webwiz Recruitment Portal API is running!");
});

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "Backend server is healthy!" });
});

// Register API routes BEFORE starting the server.
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "API route not found." });
});

app.use((error, _req, res, _next) => {
  console.error("Unhandled server error:", error);
  res.status(500).json({ message: "An unexpected server error occurred." });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
