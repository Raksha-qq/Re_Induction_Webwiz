const pool = require("../config/db");
const sendApplicationEmail = require("../services/emailService");

const submitApplication = async (req, res) => {
     try {
          const { department, year, preferred_team, reason } = req.body;

          if (!department || !year || !preferred_team || !reason) {
               return res.status(400).json({
                    message: "Please complete all application fields"
               });
          }

          const userResult = await pool.query(
               "SELECT id, name, email FROM users WHERE id = $1",
               [req.user.id]
          );

          if (userResult.rows.length === 0) {
               return res.status(404).json({ message: "User not found" });
          }

          const user = userResult.rows[0];

          const existing = await pool.query(
               "SELECT id FROM applications WHERE user_id = $1",
               [user.id]
          );

          if (existing.rows.length > 0) {
               return res.status(409).json({
                    message: "You have already submitted an application"
               });
          }

          const result = await pool.query(
               `INSERT INTO applications
       (user_id, name, email, department, year, preferred_team, reason)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, name, email, department, year, preferred_team, status`,
               [
                    user.id,
                    user.name,
                    user.email,
                    department,
                    year,
                    preferred_team,
                    reason
               ]
          );

          let emailSent = false;

          try {
               await sendApplicationEmail(user, result.rows[0]);
               emailSent = true;
          } catch (emailError) {
               console.error("Application saved, but email failed:", emailError);
          }

          return res.status(201).json({
               message: "Application submitted successfully",
               application: result.rows[0],
               emailSent
          });

     } catch (error) {
          if (error.code === "23505") {
               return res.status(409).json({
                    message: "You have already submitted an application"
               });
          }

          console.error("Application error:", error);
          return res.status(500).json({
               message: "Could not submit application"
          });
     }
};

const getMyApplication = async (req, res) => {
     try {
          const result = await pool.query(
               "SELECT * FROM applications WHERE user_id = $1",
               [req.user.id]
          );

          if (result.rows.length === 0) {
               return res.status(404).json({
                    message: "No application found"
               });
          }

          res.json(result.rows[0]);
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Could not fetch application" });
     }
};

module.exports = { submitApplication, getMyApplication };