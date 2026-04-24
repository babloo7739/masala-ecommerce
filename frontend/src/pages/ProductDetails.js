


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, addReview } from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaStar, FaShoppingCart, FaMinus, FaPlus, FaArrowLeft } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { userInfo } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      const { data } = await getProductById(id);
      setProduct(data);
    } catch {
      toast.error("Product not found");
      navigate("/");
    }
    setLoading(false);
  };

  useEffect(() => { fetchProduct(); }, [id]);

  const handleAdd = () => {
    addToCart(product, qty);
    toast.success(`${qty}x ${product.name} added to cart! 🛒`);
  };

  const handleReview = async (e) => {
    e.preventDefault();
    setReviewLoading(true);
    try {
      await addReview(id, { rating, comment });
      toast.success("Review submitted! ⭐");
      setComment("");
      setRating(5);
      fetchProduct();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    }
    setReviewLoading(false);
  };

  if (loading) return (
    <div className="text-center py-5">
      <div className="spinner-border" style={{ color: "#b5451b" }} />
    </div>
  );

  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="container py-4">
      <button className="btn btn-link text-decoration-none mb-3 ps-0" style={{ color: "#b5451b" }} onClick={() => navigate(-1)}>
        <FaArrowLeft className="me-2" /> Back
      </button>
      <div className="row g-4">
        {/* Image */}
        <div className="col-md-5">
          <div className="position-relative">
            <img
              src={product.image} alt={product.name}
              className="img-fluid rounded-3 shadow"
              style={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
              onError={e => { e.target.src = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop"; }}
            />
            {discount > 0 && (
              <span className="badge position-absolute top-0 end-0 m-3 fs-6" style={{ background: "#b5451b" }}>
                {discount}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="col-md-7">
          <span className="badge mb-2" style={{ background: "#f4a261", color: "#333" }}>{product.category}</span>
          <h2 className="fw-bold">{product.name}</h2>

          <div className="d-flex align-items-center gap-2 mb-3">
            {[1, 2, 3, 4, 5].map(s => (
              <FaStar key={s} color={s <= Math.round(product.rating) ? "#f4a261" : "#ddd"} />
            ))}
            <span className="text-muted small">({product.numReviews} reviews)</span>
          </div>

          <div className="d-flex align-items-center gap-3 mb-3">
            <span className="fw-bold" style={{ color: "#b5451b", fontSize: 32 }}>₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-muted text-decoration-line-through fs-5">₹{product.originalPrice}</span>
            )}
          </div>

          <p className="text-muted mb-3">{product.description}</p>

          <div className="row g-2 mb-3">
            {product.weight && <div className="col-auto"><span className="badge bg-light text-dark border">📦 {product.weight}</span></div>}
            {product.origin && <div className="col-auto"><span className="badge bg-light text-dark border">📍 {product.origin}</span></div>}
          </div>

          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="d-flex align-items-center border rounded" style={{ borderRadius: 8 }}>
              <button className="btn btn-sm px-3" onClick={() => setQty(Math.max(1, qty - 1))}><FaMinus /></button>
              <span className="px-3 fw-bold">{qty}</span>
              <button className="btn btn-sm px-3" onClick={() => setQty(Math.min(product.stock, qty + 1))}><FaPlus /></button>
            </div>
            <button
              className="btn fw-bold px-4 py-2"
              style={{ background: product.stock === 0 ? "#ccc" : "#b5451b", color: "white", borderRadius: 10 }}
              onClick={handleAdd} disabled={product.stock === 0}
            >
              <FaShoppingCart className="me-2" />
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>

          <div className="alert" style={{ background: "#fff3f0", border: "1px solid #f4a261", borderRadius: 10 }}>
            🏠 <strong>Cash on Delivery</strong> available | 🚚 Free shipping above ₹499
            {product.stock > 0 && <span className="ms-2 text-success">✅ In Stock ({product.stock} left)</span>}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="row mt-5 g-4">
        <div className="col-md-7">
          <h5 className="fw-bold mb-3">Customer Reviews ({product.numReviews})</h5>
          {product.reviews.length === 0 ? (
            <p className="text-muted">No reviews yet. Be the first!</p>
          ) : (
            product.reviews.map((r) => (
              <div key={r._id} className="card border-0 bg-light mb-3 p-3" style={{ borderRadius: 10 }}>
                <div className="d-flex gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map(s => <FaStar key={s} size={12} color={s <= r.rating ? "#f4a261" : "#ccc"} />)}
                  <small className="ms-2 fw-semibold">{r.name}</small>
                </div>
                <p className="mb-0">{r.comment}</p>
              </div>
            ))
          )}
        </div>
        <div className="col-md-5">
          <h5 className="fw-bold mb-3">Write a Review</h5>
          {userInfo ? (
            <form onSubmit={handleReview}>
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <select className="form-select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                  {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} ⭐</option>)}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Comment</label>
                <textarea
                  className="form-control" rows={3} value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience..." required
                />
              </div>
              <button className="btn fw-bold" style={{ background: "#b5451b", color: "white" }} disabled={reviewLoading}>
                {reviewLoading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          ) : (
            <p className="text-muted">Please <a href="/login" style={{ color: "#b5451b" }}>login</a> to write a review.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
