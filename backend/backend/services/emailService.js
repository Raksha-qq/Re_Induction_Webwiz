const { Resend } = require("resend");

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));
}

async function sendApplicationEmail(user, application) {
  if (
    !process.env.RESEND_API_KEY ||
    !process.env.CLUB_EMAIL ||
    !process.env.EMAIL_FROM
  ) {
    throw new Error("Resend environment variables are missing.");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: process.env.CLUB_EMAIL,
    subject: `New Webwiz application: ${user.name}`,
    html: `
      <h2>New Webwiz Recruitment Application</h2>
      <p><strong>Name:</strong> ${escapeHtml(user.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(user.email)}</p>
      <p><strong>Department:</strong> ${escapeHtml(application.department)}</p>
      <p><strong>Year:</strong> ${escapeHtml(application.year)}</p>
      <p><strong>Preferred team:</strong> ${escapeHtml(application.preferred_team)}</p>
      <p><strong>Reason:</strong> ${escapeHtml(application.reason)}</p>
    `
  });

  if (error) throw new Error(error.message);
  return data;
}

module.exports = sendApplicationEmail;
