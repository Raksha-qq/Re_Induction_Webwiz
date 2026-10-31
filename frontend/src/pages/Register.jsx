import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true); setMessage(""); setError(false);
    try {
      const { data } = await api.post("/auth/register", form);
      setMessage(data.message || "Account created. Please log in.");
      setTimeout(() => navigate("/login", { replace: true }), 900);
    } catch (err) {
      setError(true);
      setMessage(err.response?.data?.message || "Registration failed. Please try again.");
    } finally { setLoading(false); }
  }

  return <main className="auth-page"><div className="auth-container">
    <p className="eyebrow">WEBWIZ / GET STARTED</p>
    <h1>Create your account</h1>
    <p>One account gets you one application. Let's get started.</p>
    <form onSubmit={handleSubmit}>
      <label>Full name<input name="name" autoComplete="name" placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required maxLength={100} /></label>
      <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></label>
      <label>Password<input name="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required minLength={8} /></label>
      {message && <p className={`form-message ${error ? "error" : "success"}`} role="status">{message}</p>}
      <button type="submit" disabled={loading}>{loading ? "Creating account…" : "Create account →"}</button>
    </form>
    <p className="auth-switch">Already registered? <Link to="/login">Log in</Link></p>
    <Link className="back-home" to="/">← Back to home</Link>
  </div></main>;
}
