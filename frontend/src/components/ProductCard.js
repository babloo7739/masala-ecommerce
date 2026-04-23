import { Link } from "react-router-dom";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart! 🛒`);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: 12, overflow: "hidden", transition: "transform 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      <div style={{ position: "relative" }}>
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top"
            style={{ height: 200, objectFit: "cover" }}
            onError={e => {
              e.target.src = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop";
            }}
          />
        </Link>
        {discount > 0 && (
          <span className="badge position-absolute top-0 end-0 m-2" style={{ background: "#b5451b" }}>
            {discount}% OFF
          </span>
        )}
        {product.isFeatured && (
          <span className="badge position-absolute top-0 start-0 m-2 bg-warning text-dark">
            ⭐ Featured
          </span>
        )}
      </div>
      <div className="card-body d-flex flex-column p-3">
        <small className="text-muted text-uppercase" style={{ fontSize: 11 }}>{product.category}</small>
        <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
          <h6 className="fw-bold mt-1 mb-1" style={{ fontSize: 15, lineHeight: 1.3 }}>{product.name}</h6>
        </Link>
        {product.origin && (
          <small className="text-muted mb-2">📍 {product.origin}</small>
        )}
        <div className="d-flex align-items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map(s => (
            <FaStar key={s} size={11} color={s <= Math.round(product.rating) ? "#f4a261" : "#ddd"} />
          ))}
          <small className="text-muted ms-1">({product.numReviews})</small>
        </div>
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="fw-bold" style={{ color: "#b5451b", fontSize: 18 }}>₹{product.price}</span>
          {product.originalPrice && (
            <small className="text-muted text-decoration-line-through">₹{product.originalPrice}</small>
          )}
        </div>
        <div className="mt-auto d-flex gap-2">
          <button
            className="btn btn-sm flex-grow-1 fw-semibold"
            style={{ background: product.stock === 0 ? "#ccc" : "#b5451b", color: "white", borderRadius: 8 }}
            onClick={handleAdd}
            disabled={product.stock === 0}
          >
            <FaShoppingCart className="me-1" size={12} />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
        {product.weight && (
          <small className="text-muted text-center mt-2">📦 {product.weight}</small>
        )}
      </div>
    </div>
  );
};

export default ProductCard;