import { useState } from "react";
import { updateUserProfile } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Profile = () => {
  const { userInfo, login } = useAuth();
  const [form, setForm] = useState({ name: userInfo?.name || "", email: userInfo?.email || "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await updateUserProfile(form);
      login(data);
      toast.success("Profile updated! ✅");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
    setLoading(false);
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 shadow-sm p-4" style={{ borderRadius: 16 }}>
            <div className="text-center mb-4">
              <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{ width: 80, height: 80, background: "#b5451b" }}>
                <FaUser size={32} color="white" />
              </div>
              <h5 className="fw-bold mb-0">{userInfo?.name}</h5>
              <small className="text-muted">{userInfo?.email}</small>
              {userInfo?.isAdmin && <span className="badge bg-warning text-dark ms-2">Admin</span>}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold small">
                  <FaUser className="me-2" size={12} />Full Name
                </label>
                <input name="name" className="form-control" value={form.name}
                  onChange={handleChange} style={{ borderRadius: 10 }} />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold small">
                  <FaEnvelope className="me-2" size={12} />Email
                </label>
                <input name="email" type="email" className="form-control" value={form.email}
                  onChange={handleChange} style={{ borderRadius: 10 }} />
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold small">
                  <FaLock className="me-2" size={12} />New Password <span className="text-muted fw-normal">(optional)</span>
                </label>
                <input name="password" type="password" className="form-control" value={form.password}
                  onChange={handleChange} placeholder="Leave blank to keep current"
                  style={{ borderRadius: 10 }} />
              </div>
              <button type="submit" className="btn w-100 fw-bold py-2"
                style={{ background: "#b5451b", color: "white", borderRadius: 10 }}
                disabled={loading}>
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;