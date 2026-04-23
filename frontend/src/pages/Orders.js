import { useState, useEffect } from "react";
import { getMyOrders } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaBox } from "react-icons/fa";

const statusColor = {
  Pending: "#f4a261", Processing: "#2196f3",
  Shipped: "#9c27b0", Delivered: "#4caf50", Cancelled: "#f44336"
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) { navigate("/login"); return; }
    getMyOrders().then(({ data }) => setOrders(data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" style={{ color: "#b5451b" }} /></div>;

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">📦 My Orders</h4>
      {orders.length === 0 ? (
        <div className="text-center py-5">
          <FaBox size={60} color="#ddd" />
          <p className="text-muted mt-3">No orders yet. Start shopping!</p>
          <button className="btn fw-bold mt-2 px-4" style={{ background: "#b5451b", color: "white", borderRadius: 10 }}
            onClick={() => navigate("/")}>Shop Now</button>
        </div>
      ) : (
        orders.map(order => (
          <div key={order._id} className="card border-0 shadow-sm mb-4 overflow-hidden" style={{ borderRadius: 12 }}>
            <div className="card-header d-flex justify-content-between align-items-center py-3"
              style={{ background: "#fff8f5", borderBottom: "2px solid #f4a261" }}>
              <div>
                <small className="text-muted">Order ID</small>
                <div className="fw-bold small" style={{ fontFamily: "monospace" }}>{order._id}</div>
              </div>
              <div className="text-end">
                <span className="badge px-3 py-2" style={{ background: statusColor[order.status] || "#ccc", color: "white" }}>
                  {order.status}
                </span>
                <div className="small text-muted mt-1">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
              </div>
            </div>
            <div className="card-body p-3">
              <div className="row g-2">
                {order.orderItems.map((item, i) => (
                  <div key={i} className="col-12">
                    <div className="d-flex align-items-center gap-3">
                      <img src={item.image} alt={item.name}
                        style={{ width: 52, height: 52, objectFit: "cover", borderRadius: 8 }}
                        onError={e => { e.target.src = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=52&h=52&fit=crop"; }}
                      />
                      <div className="flex-grow-1">
                        <div className="fw-semibold small">{item.name}</div>
                        <div className="text-muted small">Qty: {item.quantity} × ₹{item.price}</div>
                      </div>
                      <div className="fw-bold small">₹{item.quantity * item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="my-2" />
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">Payment: <strong>Cash on Delivery</strong></small>
                  {order.shippingAddress && (
                    <div className="small text-muted">
                      📍 {order.shippingAddress.city}, {order.shippingAddress.state}
                    </div>
                  )}
                </div>
                <div className="text-end">
                  <div className="text-muted small">Total</div>
                  <div className="fw-bold fs-5" style={{ color: "#b5451b" }}>₹{order.totalPrice}</div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;