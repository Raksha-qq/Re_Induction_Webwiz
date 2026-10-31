import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const { data } = await api.post("/auth/login", form);
      if (!data?.token) throw new Error("The server did not return a login token.");
      login(data.token, data.user);
      navigate("/apply", { replace: true });
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return <main className="auth-page"><div className="auth-container">
    <p className="eyebrow">WEBWIZ / MEMBER ACCESS</p>
    <h1>Welcome back</h1>
    <p>Log in to continue your Webwiz application.</p>
    <form onSubmit={handleSubmit}>
      <label>Email<input type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></label>
      <label>Password<input type="password" autoComplete="current-password" placeholder="Your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required /></label>
      {message && <p className="form-message error" role="alert">{message}</p>}
      <button type="submit" disabled={loading}>{loading ? "Logging in…" : "Login →"}</button>
    </form>
    <p className="auth-switch">New here? <Link to="/register">Create an account</Link></p>
    <Link className="back-home" to="/">← Back to home</Link>
  </div></main>;
}
