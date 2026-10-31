const pool = require("../config/db");
const sendApplicationEmail = require("../services/emailService");

const APPLICATION_FIELDS = `
  id, name, email, department, year, preferred_team, reason, status, created_at
`;

const submitApplication = async (req, res) => {
  const department = String(req.body.department || "").trim();
  const year = String(req.body.year || "").trim();
  const preferred_team = String(req.body.preferred_team || "").trim();
  const reason = String(req.body.reason || "").trim();

  if (!department || !year || !preferred_team || !reason) {
    return res.status(400).json({
      message: "Please complete all application fields."
    });
  }

  if (reason.length < 20) {
    return res.status(400).json({
      message: "Please write at least 20 characters in your reason."
    });
  }

  try {
    const userResult = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [req.user.id]
    );

    if (userResult.rowCount === 0) {
      return res.status(401).json({ message: "User not found. Please log in again." });
    }

    const user = userResult.rows[0];

    const existing = await pool.query(
      `SELECT ${APPLICATION_FIELDS} FROM applications WHERE user_id = $1`,
      [user.id]
    );

    if (existing.rowCount > 0) {
      return res.status(409).json({
        message: "You have already submitted an application.",
        application: existing.rows[0]
      });
    }

    const result = await pool.query(
      `INSERT INTO applications
       (user_id, name, email, department, year, preferred_team, reason)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING ${APPLICATION_FIELDS}`,
      [user.id, user.name, user.email, department, year, preferred_team, reason]
    );

    const application = result.rows[0];

    // The database save is authoritative. Email failure must not undo it.
    let emailSent = false;
    try {
      await sendApplicationEmail(user, application);
      emailSent = true;
    } catch (emailError) {
      console.error("Application saved, but notification email failed:", emailError.message);
    }

    return res.status(201).json({
      message: "Application submitted successfully.",
      application,
      emailSent
    });
  } catch (error) {
    // Handles two near-simultaneous submissions; the DB unique index is the final guard.
    if (error.code === "23505") {
      try {
        const existing = await pool.query(
          `SELECT ${APPLICATION_FIELDS} FROM applications WHERE user_id = $1`,
          [req.user.id]
        );

        return res.status(409).json({
          message: "You have already submitted an application.",
          application: existing.rows[0] || null
        });
      } catch (lookupError) {
        console.error("Could not load existing application:", lookupError);
      }
    }

    console.error("Application submission error:", error);
    return res.status(500).json({
      message: "Could not submit your application. Please try again."
    });
  }
};

const getMyApplication = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT ${APPLICATION_FIELDS}
       FROM applications
       WHERE user_id = $1`,
      [req.user.id]
    );

    // Always return HTTP 200 and a predictable response shape.
    // No application is a normal state, not an API error.
    return res.status(200).json({
      application: result.rows[0] || null
    });
  } catch (error) {
    console.error("Get application error:", error);
    return res.status(500).json({
      message: "Could not fetch your application status."
    });
  }
};

module.exports = { submitApplication, getMyApplication };
