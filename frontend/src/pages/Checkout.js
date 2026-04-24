import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../services/api";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: userInfo?.name || "", 
    phone: "", 
    street: "",
    city: "", 
    state: "", 
    pincode: "",
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1=address, 2=review

  // Filter out any invalid cart items
  const validCartItems = cartItems.filter(item => item && item._id);
  const validCartTotal = validCartItems.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
  
  const shipping = validCartTotal >= 499 ? 0 : 49;
  const grandTotal = validCartTotal + shipping;

  const handleChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const handlePlaceOrder = async () => {
    setLoading(true);
    
    // Debug logging
    console.log("=== CHECKOUT DEBUG ===");
    console.log("Original cartItems:", cartItems);
    console.log("Valid cartItems:", validCartItems);
    
    // Check if cart is empty after filtering
    if (validCartItems.length === 0) {
      toast.error("Your cart is empty or contains invalid items. Please add items again.");
      setLoading(false);
      navigate("/cart");
      return;
    }
    
    // Validate all items have required fields
    const missingFields = validCartItems.filter(item => !item.name || !item.price || !item._id);
    if (missingFields.length > 0) {
      console.error("Items missing required fields:", missingFields);
      toast.error("Some items in your cart are invalid. Please remove them and try again.");
      setLoading(false);
      return;
    }
    
    try {
      const orderData = {
        orderItems: validCartItems.map(i => ({
          name: i.name, 
          quantity: i.qty || 1, 
          image: i.image || "https://via.placeholder.com/100",
          price: i.price, 
          product: i._id,
        })),
        shippingAddress: {
          name: address.name,
          phone: address.phone,
          street: address.street,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
        },
        itemsPrice: validCartTotal,
        shippingPrice: shipping,
        totalPrice: grandTotal,
        paymentMethod: "COD",
      };
      
      console.log("Order data being sent:", orderData);
      
      const { data } = await createOrder(orderData);
      console.log("Order response:", data);
      
      clearCart();
      toast.success("Order placed! 🎉 Cash on Delivery");
      navigate("/orders");
    } catch (err) {
      console.error("Order error:", err);
      console.error("Error response:", err.response);
      toast.error(err.response?.data?.message || err.message || "Order failed. Please try again.");
    }
    setLoading(false);
  };

  // Redirect if no valid items
  if (validCartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">Checkout</h4>

      {/* Steps */}
      <div className="d-flex align-items-center gap-3 mb-4">
        {["Shipping Address", "Review & Place Order"].map((s, i) => (
          <div key={i} className="d-flex align-items-center gap-2">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
              style={{ 
                width: 32, 
                height: 32, 
                background: step > i ? "#b5451b" : step === i + 1 ? "#b5451b" : "#ddd", 
                color: "white", 
                fontSize: 14 
              }}
            >
              {step > i + 1 ? "✓" : i + 1}
            </div>
            <span className={`fw-semibold small ${step === i + 1 ? "" : "text-muted"}`}>{s}</span>
            {i === 0 && <span className="text-muted">→</span>}
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-md-7">
          {step === 1 && (
            <div className="card border-0 shadow-sm p-4" style={{ borderRadius: 12 }}>
              <h5 className="fw-bold mb-4">
                <FaMapMarkerAlt className="me-2" color="#b5451b" />
                Delivery Address
              </h5>
              <div className="row g-3">
                {[
                  { name: "name", label: "Full Name", col: 6, required: true },
                  { name: "phone", label: "Phone Number", col: 6, required: true },
                  { name: "street", label: "Street Address", col: 12, required: true },
                  { name: "city", label: "City", col: 4, required: true },
                  { name: "state", label: "State", col: 4, required: true },
                  { name: "pincode", label: "Pincode", col: 4, required: true },
                ].map(f => (
                  <div className={`col-md-${f.col}`} key={f.name}>
                    <label className="form-label fw-semibold small">
                      {f.label} {f.required && <span className="text-danger">*</span>}
                    </label>
                    <input
                      name={f.name}
                      className="form-control"
                      value={address[f.name]}
                      onChange={handleChange}
                      required={f.required}
                      placeholder={f.label}
                      style={{ borderRadius: 8 }}
                    />
                  </div>
                ))}
              </div>
              <button
                className="btn fw-bold mt-4 px-5"
                style={{ background: "#b5451b", color: "white", borderRadius: 10 }}
                onClick={() => {
                  if (!address.name || !address.phone || !address.street || !address.city || !address.state || !address.pincode) {
                    toast.error("Please fill all address fields");
                    return;
                  }
                  if (!/^\d{6}$/.test(address.pincode)) {
                    toast.error("Please enter a valid 6-digit pincode");
                    return;
                  }
                  if (!/^\d{10}$/.test(address.phone)) {
                    toast.error("Please enter a valid 10-digit phone number");
                    return;
                  }
                  setStep(2);
                }}
              >
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="card border-0 shadow-sm p-4" style={{ borderRadius: 12 }}>
              <h5 className="fw-bold mb-3">
                <FaCheckCircle className="me-2" color="#b5451b" />
                Review Order
              </h5>
              
              <div className="mb-3 p-3 rounded" style={{ background: "#fff8f5" }}>
                <h6 className="fw-bold">Delivery to:</h6>
                <p className="mb-0">{address.name} | {address.phone}</p>
                <p className="mb-0 text-muted small">
                  {address.street}, {address.city}, {address.state} - {address.pincode}
                </p>
                <button 
                  className="btn btn-link btn-sm p-0 mt-1" 
                  style={{ color: "#b5451b" }} 
                  onClick={() => setStep(1)}
                >
                  Edit Address
                </button>
              </div>

              {validCartItems.map(item => (
                <div key={item._id} className="d-flex gap-3 align-items-center mb-2 pb-2 border-bottom">
                  <img 
                    src={item.image || "https://via.placeholder.com/50"} 
                    alt={item.name || "Product"}
                    style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 8 }}
                    onError={e => { 
                      e.target.src = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=50&h=50&fit=crop"; 
                    }}
                  />
                  <div className="flex-grow-1">
                    <div className="fw-semibold small">{item.name || "Unknown Product"}</div>
                    <div className="text-muted small">Qty: {item.qty || 1}</div>
                  </div>
                  <div className="fw-bold" style={{ color: "#b5451b" }}>
                    ₹{(item.price || 0) * (item.qty || 1)}
                  </div>
                </div>
              ))}

              <div className="alert mt-3 py-2" style={{ background: "#e8f5e9", border: "1px solid #4caf50", borderRadius: 8 }}>
                🏠 <strong>Cash on Delivery</strong> - Pay ₹{grandTotal} when order arrives
              </div>

              <button
                className="btn w-100 fw-bold py-2 mt-2"
                style={{ background: "#2e7d32", color: "white", borderRadius: 10, fontSize: 18 }}
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Placing Order...
                  </>
                ) : (
                  "🎉 Place Order (COD)"
                )}
              </button>
            </div>
          )}
        </div>

        <div className="col-md-5">
          <div className="card border-0 shadow-sm p-4 sticky-top" style={{ borderRadius: 12, top: 80 }}>
            <h6 className="fw-bold mb-3">Order Summary ({validCartItems.length} items)</h6>
            {validCartItems.map(item => (
              <div key={item._id} className="d-flex justify-content-between mb-1 small">
                <span className="text-muted">{item.name || "Product"} × {item.qty || 1}</span>
                <span>₹{(item.price || 0) * (item.qty || 1)}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between mb-1">
              <span>Subtotal</span>
              <span>₹{validCartTotal}</span>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <span>Shipping</span>
              <span className={shipping === 0 ? "text-success" : ""}>
                {shipping === 0 ? "FREE" : `₹${shipping}`}
              </span>
            </div>
            {validCartTotal < 499 && validCartTotal > 0 && (
              <small className="text-muted d-block mb-2">
                Add ₹{499 - validCartTotal} more for free shipping!
              </small>
            )}
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>
              <span style={{ color: "#b5451b" }}>₹{grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
