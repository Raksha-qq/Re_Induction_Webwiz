const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const {
  submitApplication,
  getMyApplication
} = require("../controllers/applicationController");

router.get("/me", authenticateToken, getMyApplication);
router.post("/", authenticateToken, submitApplication);

module.exports = router;
