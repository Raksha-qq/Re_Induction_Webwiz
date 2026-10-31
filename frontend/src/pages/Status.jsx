import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Status() {
  const { user, application, applicationLoading, applicationError, refreshApplication, logout } = useAuth();
  const navigate = useNavigate();

  if (applicationLoading) return <div className="page-loading">Loading your application…</div>;

  return <main className="auth-page"><section className="auth-container status-container">
    <p className="eyebrow">WEBWIZ / APPLICATION PORTAL</p>
    {application ? <>
      <div className="status-icon">✓</div>
      <h1>Application received.</h1>
      <p>Thanks{user?.name ? `, ${user.name}` : ""}. Your application has been submitted successfully.</p>
      <div className="status-pill">{application.status || "Pending"}</div>
      <div className="application-summary">
        <div><span>Department</span><strong>{application.department}</strong></div>
        <div><span>Year</span><strong>{application.year}</strong></div>
        <div><span>Preferred team</span><strong>{application.preferred_team}</strong></div>
        <div><span>Submitted</span><strong>{application.created_at ? new Date(application.created_at).toLocaleDateString() : "Received"}</strong></div>
      </div>
      <p className="status-note">You can return to this page any time to check your application status. You don't need to submit another application.</p>
    </> : <>
      <h1>No application found yet.</h1>
      <p>Your account is ready. Continue to the application form when you're ready.</p>
      {applicationError && <p className="form-message error">{applicationError}</p>}
      <button onClick={() => navigate("/apply")}>Continue application →</button>
      <button className="secondary-button" onClick={refreshApplication}>Check again</button>
    </>}
    <div className="auth-bottom"><Link className="back-home" to="/">← Home</Link><button className="text-button" onClick={() => { logout(); navigate("/", { replace: true }); }}>Log out</button></div>
  </section></main>;
}
