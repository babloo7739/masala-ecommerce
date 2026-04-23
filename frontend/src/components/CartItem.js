import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQty } = useCart();

  return (
    <div className="card mb-3 border-0 shadow-sm">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-3 col-md-2">
            <img
              src={item.image}
              alt={item.name}
              className="img-fluid rounded"
              style={{ maxHeight: "70px", objectFit: "cover" }}
              onError={(e) => (e.target.src = "https://via.placeholder.com/70?text=Spice")}
            />
          </div>
          <div className="col-4 col-md-5">
            <h6 className="mb-0 fw-bold">{item.name}</h6>
            <small className="text-muted">{item.weight}</small>
          </div>
          <div className="col-3 col-md-3 text-center">
            <select
              className="form-select form-select-sm"
              value={item.quantity}
              onChange={(e) => updateQty(item._id, Number(e.target.value))}
            >
              {[...Array(Math.min(item.stock, 10)).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="col-2 col-md-2 text-end">
            <div className="fw-bold" style={{ color: "#b5451b" }}>
              ₹{(item.price * item.quantity).toFixed(2)}
            </div>
            <button
              className="btn btn-sm btn-link text-danger p-0 mt-1"
              onClick={() => removeFromCart(item._id)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
