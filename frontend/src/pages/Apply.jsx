import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Apply() {
     const navigate = useNavigate();

     const [form, setForm] = useState({
          department: "",
          year: "",
          preferred_team: "",
          reason: ""
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
               const response = await api.post("/applications", form);
               setMessage(response.data.message);
          } catch (error) {
               setMessage(error.response?.data?.message || "Application failed");
          } finally {
               setLoading(false);
          }
     };

     const logout = () => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
     };

     return (
          <div className="auth-container">
               <h1>Webwiz Application</h1>
               <p>Tell us a little about yourself.</p>

               <form onSubmit={handleSubmit}>
                    <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />

                    <select name="year" value={form.year} onChange={handleChange} required>
                         <option value="">Select year</option>
                         <option value="1st Year">1st Year</option>
                         <option value="2nd Year">2nd Year</option>
                         <option value="3rd Year">3rd Year</option>
                         <option value="4th Year">4th Year</option>
                    </select>

                    <select name="preferred_team" value={form.preferred_team} onChange={handleChange} required>
                         <option value="">Select preferred team</option>
                         <option value="Development">Development</option>
                         <option value="UI/UX Design">UI/UX Design</option>
                         <option value="Technical Projects">Technical Projects</option>
                         <option value="Creative & Media">Creative & Media</option>
                    </select>

                    <textarea
                         name="reason"
                         placeholder="Why do you want to join Webwiz?"
                         value={form.reason}
                         onChange={handleChange}
                         required
                    />

                    <button disabled={loading}>
                         {loading ? "Submitting..." : "Submit application"}
                    </button>
               </form>

               {message && <p>{message}</p>}

               <button type="button" onClick={logout}>Logout</button>
          </div>
     );
}

export default Apply;