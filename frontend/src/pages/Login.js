
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { GiChiliPepper } from "react-icons/gi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginUser(form);
      login(data);
      toast.success(`Welcome back, ${data.name}! 🌶️`);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
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
                <h3 className="fw-bold mt-2">Welcome Back!</h3>
                <p className="text-muted small">Login to your MasalaHub account</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email" name="email" className="form-control form-control-lg"
                    placeholder="you@example.com" value={form.email}
                    onChange={handleChange} required
                    style={{ borderRadius: 10 }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <div className="input-group">
                    <input
                      type={showPass ? "text" : "password"} name="password"
                      className="form-control form-control-lg" placeholder="••••••••"
                      value={form.password} onChange={handleChange} required
                      style={{ borderRadius: "10px 0 0 10px" }}
                    />
                    <button type="button" className="btn btn-outline-secondary"
                      style={{ borderRadius: "0 10px 10px 0" }}
                      onClick={() => setShowPass(!showPass)}>
                      {showPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn w-100 fw-bold py-2 mt-2"
                  style={{ background: "#b5451b", color: "white", borderRadius: 10 }}
                  disabled={loading}>
                  {loading ? <><span className="spinner-border spinner-border-sm me-2" />Logging in...</> : "Login 🌶️"}
                </button>
              </form>
              <hr />
              <p className="text-center mb-0 small">
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#b5451b" }} className="fw-semibold">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
