const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const {
     submitApplication,
     getMyApplication
} = require("../controllers/applicationController");

router.post("/", authenticateToken, submitApplication);
router.get("/me", authenticateToken, getMyApplication);

module.exports = router;