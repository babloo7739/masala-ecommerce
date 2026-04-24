
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { GiChiliPepper } from "react-icons/gi";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return toast.error("Passwords do not match!");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    setLoading(true);
    try {
      const { data } = await registerUser({ name: form.name, email: form.email, password: form.password });
      login(data);
      toast.success("Account created! Welcome to MasalaHub 🌶️");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ background: "linear-gradient(135deg, #fff8f5, #ffe8d6)" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div className="card border-0 shadow-lg p-4" style={{ borderRadius: 16 }}>
              <div className="text-center mb-4">
                <GiChiliPepper size={48} color="#b5451b" />
                <h3 className="fw-bold mt-2">Create Account</h3>
                <p className="text-muted small">Join MasalaHub today!</p>
              </div>
              <form onSubmit={handleSubmit}>
                {[
                  { field: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                  { field: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                  { field: "password", label: "Password", type: "password", placeholder: "Min 6 characters" },
                  { field: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Repeat password" },
                ].map(({ field, label, type, placeholder }) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label fw-semibold">{label}</label>
                    <input
                      type={type} name={field} className="form-control"
                      placeholder={placeholder} value={form[field]}
                      onChange={handleChange} required
                      style={{ borderRadius: 10 }}
                    />
                  </div>
                ))}
                <button type="submit" className="btn w-100 fw-bold py-2"
                  style={{ background: "#b5451b", color: "white", borderRadius: 10 }}
                  disabled={loading}>
                  {loading ? <><span className="spinner-border spinner-border-sm me-2" />Creating...</> : "Create Account"}
                </button>
              </form>
              <hr />
              <p className="text-center mb-0 small">
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#b5451b" }} className="fw-semibold">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
