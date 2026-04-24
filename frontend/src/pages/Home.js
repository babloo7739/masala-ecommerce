

import { useState, useEffect } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import { GiChiliPepper, GiSpoon } from "react-icons/gi";
import { FaSearch, FaTruck, FaLeaf, FaStar } from "react-icons/fa";

const CATEGORIES = ["All", "Chilli", "Turmeric", "Blended", "Seeds", "Powder", "Pepper"];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  
  // Pagination state
  const [visibleCount, setVisibleCount] = useState(8);
  const [showMoreLoading, setShowMoreLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const searchKeyword = keyword || "";
        const categoryFilter = category === "All" ? "" : category;
        const { data } = await getProducts(searchKeyword, categoryFilter);
        setProducts(data);
        // Reset visible count when search/category changes
        setVisibleCount(8);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [keyword, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(searchInput);
  };

  const clearSearch = () => {
    setKeyword("");
    setSearchInput("");
  };

  const featured = products.filter(p => p.isFeatured);
  
  // Get visible products based on visibleCount
  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;
  
  const handleShowMore = () => {
    setShowMoreLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 8, products.length));
      setShowMoreLoading(false);
    }, 300);
  };

  return (
    <div>
      {/* Hero Section with Custom Background Image */}
      <div style={{
        background: "linear-gradient(135deg, rgba(181, 69, 27, 0.85) 0%, rgba(139, 37, 0, 0.85) 50%, rgba(26, 26, 26, 0.85) 100%), url('/images/babloo.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
        backgroundRepeat: "no-repeat",
        // minHeight: 480,
         backgroundAttachment: "scroll",
        minHeight: "clamp(420px, 60vh, 600px)",
        display: "flex",
        alignItems: "center",
        

      }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-7 text-white">
              <div className="d-flex align-items-center gap-2 mb-3">
                <GiChiliPepper size={32} />
                <span className="badge bg-warning text-dark px-3 py-2">Premium Indian Spices</span>
              </div>
              <h1 className="display-4 fw-bold mb-3">
                Taste the<br />
                <span style={{ color: "#f4a261" }}>Real India 🌶️</span>
              </h1>
              <p className="fs-5 mb-4" style={{ color: "#ffd9c0" }}>
                Farm-fresh spices from Kashmir to Kerala. Authentic flavors, doorstep delivery.
              </p>
              <div className="d-flex gap-3 mb-4">
                <div className="d-flex align-items-center gap-2">
                  <FaTruck color="#f4a261" /> <span>Free delivery ₹499+</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FaLeaf color="#f4a261" /> <span>100% Organic</span>
                </div>
              </div>
              <form onSubmit={handleSearch} className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Search spices... (e.g. turmeric, jeera)"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  style={{ borderRadius: 12, maxWidth: 380 }}
                />
                <button type="submit" className="btn btn-warning btn-lg fw-bold px-4" style={{ borderRadius: 12 }}>
                  <FaSearch />
                </button>
              </form>
            </div>
            <div className="col-md-5 text-center d-none d-md-block">
              <div style={{ textAlign: "center" }}>
                <GiSpoon size={180} color="rgba(255,255,255,0.1)" />
                <div style={{ marginTop: "-20px" }}>
                  <GiChiliPepper size={80} color="#f4a261" style={{ opacity: 0.9 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Strip */}
      <div style={{ background: "#fff8f5", borderBottom: "2px solid #f4a261" }}>
        <div className="container py-3">
          <div className="row text-center g-3">
            {[
              { icon: "🚚", title: "Free Delivery", sub: "Orders above ₹499" },
              { icon: "🌿", title: "100% Organic", sub: "Farm to kitchen" },
              { icon: "💯", title: "Quality Assured", sub: "Lab tested spices" },
              { icon: "🏠", title: "Cash on Delivery", sub: "Pay when received" },
            ].map(f => (
              <div className="col-6 col-md-3" key={f.title}>
                <div className="d-flex align-items-center gap-2 justify-content-center">
                  <span style={{ fontSize: 24 }}>{f.icon}</span>
                  <div className="text-start">
                    <div className="fw-bold small">{f.title}</div>
                    <div className="text-muted" style={{ fontSize: 11 }}>{f.sub}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-5">
        {/* Featured Section */}
        {featured.length > 0 && !keyword && category === "All" && (
          <div className="mb-5">
            <div className="d-flex align-items-center gap-2 mb-4">
              <FaStar color="#f4a261" size={20} />
              <h4 className="fw-bold mb-0">Featured Picks</h4>
            </div>
            <div className="row g-4">
              {featured.slice(0, 4).map(p => (
                <div className="col-6 col-md-3" key={p._id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="d-flex gap-2 flex-wrap mb-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`btn btn-sm px-3 fw-semibold ${category === cat ? "text-white" : "btn-outline-secondary"}`}
              style={{
                borderRadius: 20,
                background: category === cat ? "#b5451b" : "",
                borderColor: category === cat ? "#b5451b" : "",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid Header */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="fw-bold mb-0">
            {keyword ? `Results for "${keyword}"` : category === "All" ? "All Spices" : `${category} Spices`}
            <span className="text-muted fw-normal fs-6 ms-2">({visibleProducts.length} of {products.length} products)</span>
          </h5>
          {keyword && (
            <button className="btn btn-sm btn-outline-secondary" onClick={clearSearch}>
              Clear Search ✕
            </button>
          )}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: "#b5451b" }} />
            <p className="mt-3 text-muted">Loading fresh spices...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-5">
            <GiChiliPepper size={60} color="#ccc" />
            <p className="text-muted mt-3">No spices found. Try a different search!</p>
          </div>
        ) : (
          <>
            <div className="row g-4">
              {visibleProducts.map(p => (
                <div className="col-6 col-md-3" key={p._id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
            
            {/* Show More Button */}
            {hasMore && (
              <div className="text-center mt-5">
                <button
                  onClick={handleShowMore}
                  disabled={showMoreLoading}
                  className="btn btn-lg px-5 py-2 fw-bold"
                  style={{
                    backgroundColor: "#b5451b",
                    color: "white",
                    borderRadius: 50,
                    border: "none",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#8b2500";
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#b5451b";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  {showMoreLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Loading...
                    </>
                  ) : (
                    `Show More (${products.length - visibleCount} more)`
                  )}
                </button>
              </div>
            )}
            
            {/* Optional: Show "No more products" message */}
            {!hasMore && visibleCount > 8 && (
              <div className="text-center mt-4">
                <p className="text-muted">
                  <GiChiliPepper size={20} className="me-2" />
                  You've seen all {products.length} products!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;