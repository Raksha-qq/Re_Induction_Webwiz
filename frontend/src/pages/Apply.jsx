import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Apply() {
  const navigate = useNavigate();
  const { user, setApplication, logout } = useAuth();
  const [form, setForm] = useState({ department: "", year: "", preferred_team: "", reason: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true); setMessage("");
    try {
      const { data } = await api.post("/applications", form);
      setApplication(data.application || null);
      navigate("/status", { replace: true });
    } catch (error) {
      const existing = error.response?.data?.application;
      if (error.response?.status === 409 && existing) {
        setApplication(existing);
        navigate("/status", { replace: true });
      } else {
        setMessage(error.response?.data?.message || "Your application could not be submitted. Please try again.");
      }
    } finally { setLoading(false); }
  }

  return <main className="auth-page"><div className="auth-container apply-container">
    <p className="eyebrow">WEBWIZ / RECRUITMENT 2026</p>
    <h1>Your application</h1>
    <p>Hi{user?.name ? `, ${user.name}` : ""}. Tell us a little about yourself.</p>
    <form onSubmit={handleSubmit}>
      <label>Department<input name="department" placeholder="e.g. Computer Science and Engineering" value={form.department} onChange={handleChange} required maxLength={100} /></label>
      <label>Current year<select name="year" value={form.year} onChange={handleChange} required>
        <option value="">Select your year</option><option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option>
      </select></label>
      <label>Preferred team<select name="preferred_team" value={form.preferred_team} onChange={handleChange} required>
        <option value="">Choose a team</option><option>Development</option><option>UI/UX Design</option><option>Technical Projects</option><option>Creative &amp; Media</option>
      </select></label>
      <label>Why do you want to join Webwiz?<textarea name="reason" placeholder="Tell us what interests you, what you'd like to learn, or what you'd love to build…" value={form.reason} onChange={handleChange} required minLength={20} maxLength={2000} /></label>
      <p className="field-hint">Please write at least 20 characters.</p>
      {message && <p className="form-message error" role="alert">{message}</p>}
      <button type="submit" disabled={loading}>{loading ? "Submitting…" : "Submit application →"}</button>
    </form>
    <div className="auth-bottom"><Link className="back-home" to="/">← Home</Link><button className="text-button" type="button" onClick={() => { logout(); navigate("/", { replace: true }); }}>Log out</button></div>
  </div></main>;
}
