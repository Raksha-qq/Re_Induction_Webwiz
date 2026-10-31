import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
     const navigate = useNavigate();

     const [form, setForm] = useState({
          name: "",
          email: "",
          password: ""
     });

     const [message, setMessage] = useState("");
     const [loading, setLoading] = useState(false);

     const handleChange = (e) => {
          setForm({ ...form, [e.target.name]: e.target.value });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);
          setMessage("");

          try {
               await api.post("/auth/register", form);
               setMessage("Registration successful! Please log in.");
               setTimeout(() => navigate("/login"), 1000);
          } catch (error) {
               setMessage(error.response?.data?.message || "Registration failed");
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="auth-container">
               <h1>Join Webwiz</h1>
               <p>Create your account to apply.</p>

               <form onSubmit={handleSubmit}>
                    <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
                    <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <input name="password" type="password" placeholder="Password (minimum 8 characters)" value={form.password} onChange={handleChange} required minLength={8} />

                    <button disabled={loading}>
                         {loading ? "Creating account..." : "Register"}
                    </button>
               </form>

               {message && <p>{message}</p>}

               <p>Already registered? <Link to="/login">Login</Link></p>
          </div>
     );
}

export default Register;