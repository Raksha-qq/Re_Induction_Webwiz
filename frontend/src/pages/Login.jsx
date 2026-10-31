import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
     const navigate = useNavigate();

     const [form, setForm] = useState({
          email: "",
          password: ""
     });

     const [message, setMessage] = useState("");
     const [loading, setLoading] = useState(false);

     const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);
          setMessage("");

          try {
               const response = await api.post("/auth/login", form);

               // Save authentication details
               localStorage.setItem("token", response.data.token);
               localStorage.setItem("user", JSON.stringify(response.data.user));

               // Redirect to application page
               navigate("/apply");

          } catch (error) {
               setMessage(
                    error.response?.data?.message || "Login failed"
               );
          } finally {
               setLoading(false);
          }
     };
     return (
          <div className="auth-container">
               <h1>Welcome back</h1>
               <p>Log in to continue your Webwiz application.</p>

               <form onSubmit={handleSubmit}>
                    <input
                         type="email"
                         placeholder="Email"
                         value={form.email}
                         onChange={(e) => setForm({ ...form, email: e.target.value })}
                         required
                    />

                    <input
                         type="password"
                         placeholder="Password"
                         value={form.password}
                         onChange={(e) => setForm({ ...form, password: e.target.value })}
                         required
                    />

                    <button disabled={loading}>
                         {loading ? "Logging in..." : "Login"}
                    </button>
               </form>

               {message && <p>{message}</p>}

               <p>New here? <Link to="/register">Create an account</Link></p>
          </div>
     );
}

export default Login;