import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { GiChiliPepper } from "react-icons/gi";
import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { userInfo, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={{ background: "#b5451b" }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2 text-white fw-bold fs-4" to="/">
          <GiChiliPepper size={28} />
          Babloo MasalaHub
        </Link>

        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span style={{ color: "white", fontSize: 24 }}>☰</span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white position-relative" to="/cart">
                <FaShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark" style={{ fontSize: 10 }}>
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
            {userInfo ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white d-flex align-items-center gap-1" href="#" data-bs-toggle="dropdown">
                  <FaUser /> {userInfo.name.split(" ")[0]}
                </a>
                <ul className="dropdown-menu dropdown-menu-end shadow">
                  <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                  <li><Link className="dropdown-item" to="/orders">My Orders</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger d-flex align-items-center gap-2" onClick={handleLogout}>
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-light btn-sm px-3" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-warning btn-sm px-3 fw-bold" to="/register">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;