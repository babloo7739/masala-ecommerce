


import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { GiChiliPepper } from "react-icons/gi";

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const shipping = cartTotal >= 499 ? 0 : 49;
  const grandTotal = cartTotal + shipping;

  const handleCheckout = () => {
    if (!userInfo) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  if (cartItems.length === 0) return (
    <div className="container py-5 text-center">
      <GiChiliPepper size={80} color="#ddd" />
      <h4 className="mt-3 text-muted">Your cart is empty!</h4>
      <p className="text-muted">Add some spices to get started 🌶️</p>
      <Link to="/" className="btn fw-bold px-4 mt-2" style={{ background: "#b5451b", color: "white", borderRadius: 10 }}>
        <FaShoppingCart className="me-2" /> Shop Now
      </Link>
    </div>
  );

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">🛒 Shopping Cart ({cartItems.length} items)</h4>
      <div className="row g-4">
        <div className="col-md-8">
          {cartItems.map(item => (
            <div key={item._id} className="card border-0 shadow-sm mb-3 p-3" style={{ borderRadius: 12 }}>
              <div className="d-flex gap-3 align-items-center">
                <img
                  src={item.image} alt={item.name}
                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 10 }}
                  onError={e => { e.target.src = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=80&h=80&fit=crop"; }}
                />
                <div className="flex-grow-1">
                  <h6 className="fw-bold mb-1">{item.name}</h6>
                  <span className="text-muted small">{item.category}</span>
                </div>
                <div className="text-end">
                  <div className="fw-bold mb-2" style={{ color: "#b5451b" }}>₹{item.price * item.qty}</div>
                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-sm btn-outline-secondary" style={{ borderRadius: 6 }}
                      onClick={() => updateQty(item._id, item.qty - 1)}><FaMinus size={10} /></button>
                    <span className="fw-bold px-1">{item.qty}</span>
                    <button className="btn btn-sm btn-outline-secondary" style={{ borderRadius: 6 }}
                      onClick={() => updateQty(item._id, item.qty + 1)}><FaPlus size={10} /></button>
                    <button className="btn btn-sm btn-outline-danger ms-1" style={{ borderRadius: 6 }}
                      onClick={() => removeFromCart(item._id)}><FaTrash size={10} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4" style={{ borderRadius: 12 }}>
            <h5 className="fw-bold mb-4">Order Summary</h5>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span><strong>₹{cartTotal}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <strong className={shipping === 0 ? "text-success" : ""}>
                {shipping === 0 ? "FREE 🎉" : `₹${shipping}`}
              </strong>
            </div>
            {cartTotal < 499 && (
              <small className="text-muted mb-2 d-block">Add ₹{499 - cartTotal} more for free shipping!</small>
            )}
            <hr />
            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold fs-5">Total</span>
              <strong className="fs-5" style={{ color: "#b5451b" }}>₹{grandTotal}</strong>
            </div>
            <div className="alert mb-3 py-2 text-center small" style={{ background: "#fff3f0", border: "1px solid #f4a261" }}>
              🏠 Cash on Delivery
            </div>
            <button className="btn w-100 fw-bold py-2"
              style={{ background: "#b5451b", color: "white", borderRadius: 10 }}
              onClick={handleCheckout}>
              Proceed to Checkout →
            </button>
            <Link to="/" className="btn btn-outline-secondary w-100 mt-2" style={{ borderRadius: 10 }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;