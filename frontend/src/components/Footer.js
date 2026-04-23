// import { GiChiliPepper } from "react-icons/gi";
// import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

// const Footer = () => (
//   <footer style={{ background: "#1a1a1a", color: "#ccc" }} className="py-5 mt-auto">
//     <div className="container">
//       <div className="row g-4">
//         <div className="col-md-4">
//           <div className="d-flex align-items-center gap-2 mb-3">
//             <GiChiliPepper size={24} color="#b5451b" />
//             <span className="fw-bold text-white fs-5"> Babloo MasalaHub</span>
//           </div>
//           <p className="small">Premium Indian spices delivered to your doorstep. Authentic flavors, farm to kitchen.</p>
//           <div className="d-flex gap-3 mt-3">
//             <FaInstagram size={20} color="#b5451b" style={{ cursor: "pointer" }} />
//             <FaTwitter size={20} color="#b5451b" style={{ cursor: "pointer" }} />
//             <FaFacebook size={20} color="#b5451b" style={{ cursor: "pointer" }} />
//           </div>
//         </div>
//         <div className="col-md-2">
//           <h6 className="text-white fw-bold mb-3">Shop</h6>
//           <ul className="list-unstyled small">
//             <li className="mb-2"><a href="/" className="text-decoration-none" style={{ color: "#ccc" }}>All Spices</a></li>
//             <li className="mb-2"><a href="/?category=Blended" className="text-decoration-none" style={{ color: "#ccc" }}>Blended</a></li>
//             <li className="mb-2"><a href="/?category=Chilli" className="text-decoration-none" style={{ color: "#ccc" }}>Chilli</a></li>
//           </ul>
//         </div>
//         <div className="col-md-3">
//           <h6 className="text-white fw-bold mb-3">Customer</h6>
//           <ul className="list-unstyled small">
//             <li className="mb-2"><a href="/orders" className="text-decoration-none" style={{ color: "#ccc" }}>My Orders</a></li>
//             <li className="mb-2"><a href="/profile" className="text-decoration-none" style={{ color: "#ccc" }}>My Profile</a></li>
//             <li className="mb-2"><a href="/cart" className="text-decoration-none" style={{ color: "#ccc" }}>Cart</a></li>
//           </ul>
//         </div>
//         <div className="col-md-3">
//           <h6 className="text-white fw-bold mb-3">Contact</h6>
//           <p className="small mb-1">📧 241fd01008@gmail.com</p>
//           <p className="small mb-1">📞 +91 7739960960</p>
//           <p className="small">📍 Guntur, Andhra Pradesh</p>
//         </div>
//       </div>
//       <hr style={{ borderColor: "#333" }} />
//       <p className="text-center small mb-0">© 2024 Babloo MasalaHub. Built with ❤️ in India | Cash on Delivery Available 🚚</p>
//     </div>
//   </footer>
// );

// export default Footer;



import { GiChiliPepper } from "react-icons/gi";
import { FaInstagram, FaTwitter, FaFacebook, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={{ background: "#1a1a1a", color: "#ccc" }} className="py-5 mt-auto">
      <div className="container">
        <div className="row g-4">

          {/* Brand */}
          <div className="col-md-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <GiChiliPepper size={24} color="#b5451b" />
              <span className="fw-bold text-white fs-5">Babloo MasalaHub</span>
            </div>

            <p className="small">
              Premium Indian spices delivered to your doorstep. Authentic flavors, farm to kitchen.
            </p>

            {/* 🔗 SOCIAL LINKS */}
            <div className="d-flex gap-3 mt-3">

              {/* Instagram */}
              <a
                href="https://instagram.com/iamyadav_m"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram
                  size={20}
                  style={{ color: "#b5451b", cursor: "pointer" }}
                />
              </a>

              {/* Twitter */}
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter
                  size={20}
                  style={{ color: "#b5451b", cursor: "pointer" }}
                />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/babloodairy77"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook
                  size={20}
                  style={{ color: "#b5451b", cursor: "pointer" }}
                />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/917739960960?text=Hi%20I%20want%20to%20order%20from%20MasalaHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp
                  size={20}
                  style={{ color: "#25D366", cursor: "pointer" }}
                />
              </a>

            </div>
          </div>

          {/* Shop */}
          <div className="col-md-2">
            <h6 className="text-white fw-bold mb-3">Shop</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="/" className="text-decoration-none" style={{ color: "#ccc" }}>
                  All Spices
                </a>
              </li>
              <li className="mb-2">
                <a href="/?category=Blended" className="text-decoration-none" style={{ color: "#ccc" }}>
                  Blended
                </a>
              </li>
              <li className="mb-2">
                <a href="/?category=Chilli" className="text-decoration-none" style={{ color: "#ccc" }}>
                  Chilli
                </a>
              </li>
            </ul>
          </div>

          {/* Customer */}
          <div className="col-md-3">
            <h6 className="text-white fw-bold mb-3">Customer</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="/orders" className="text-decoration-none" style={{ color: "#ccc" }}>
                  My Orders
                </a>
              </li>
              <li className="mb-2">
                <a href="/profile" className="text-decoration-none" style={{ color: "#ccc" }}>
                  My Profile
                </a>
              </li>
              <li className="mb-2">
                <a href="/cart" className="text-decoration-none" style={{ color: "#ccc" }}>
                  Cart
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3">
            <h6 className="text-white fw-bold mb-3">Contact</h6>
            <p className="small mb-1">📧 241fd01008@gmail.com</p>
            <p className="small mb-1">📞 +91 7739960960</p>
            <p className="small">📍 Guntur, Andhra Pradesh</p>
          </div>

        </div>

        <hr style={{ borderColor: "#333" }} />

        <p className="text-center small mb-0">
          © 2026 Babloo MasalaHub. Built with ❤️ in India | Cash on Delivery Available 🚚
        </p>
      </div>
    </footer>
  );
};

export default Footer;