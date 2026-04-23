// import { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(() => {
//     const saved = localStorage.getItem("cart");
//     return saved ? JSON.parse(saved) : [];
//   });

//   const saveCart = (items) => {
//     setCartItems(items);
//     localStorage.setItem("cart", JSON.stringify(items));
//   };

//   const addToCart = (product, qty = 1) => {
//     const exists = cartItems.find((x) => x._id === product._id);
//     let updated;
//     if (exists) {
//       updated = cartItems.map((x) =>
//         x._id === product._id ? { ...x, qty: x.qty + qty } : x
//       );
//     } else {
//       updated = [...cartItems, { ...product, qty }];
//     }
//     saveCart(updated);
//   };

//   const removeFromCart = (id) => saveCart(cartItems.filter((x) => x._id !== id));

//   const updateQty = (id, qty) => {
//     if (qty < 1) return removeFromCart(id);
//     saveCart(cartItems.map((x) => (x._id === id ? { ...x, qty } : x)));
//   };

//   const clearCart = () => saveCart([]);

//   const cartCount = cartItems.reduce((a, x) => a + x.qty, 0);
//   const cartTotal = cartItems.reduce((a, x) => a + x.price * x.qty, 0);

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);



import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      // Filter out any null/undefined items or items without _id
      const valid = parsed.filter(item => item && item._id && typeof item.price === 'number');
      if (valid.length !== parsed.length) {
        console.warn(`Removed ${parsed.length - valid.length} invalid cart items`);
        localStorage.setItem("cart", JSON.stringify(valid));
      }
      return valid;
    } catch (e) {
      console.error("Error loading cart:", e);
      return [];
    }
  });

  const saveCart = (items) => {
    // Filter before saving
    const validItems = items.filter(item => item && item._id);
    setCartItems(validItems);
    localStorage.setItem("cart", JSON.stringify(validItems));
  };

  const addToCart = (product, qty = 1) => {
    // Validate product
    if (!product || !product._id) {
      console.error("Cannot add invalid product to cart:", product);
      return;
    }
    
    const exists = cartItems.find((x) => x._id === product._id);
    let updated;
    
    if (exists) {
      updated = cartItems.map((x) =>
        x._id === product._id ? { ...x, qty: (x.qty || 0) + qty } : x
      );
    } else {
      updated = [...cartItems, { 
        ...product, 
        qty: qty,
        _id: product._id,
        price: product.price || 0,
        name: product.name || "Unknown",
        image: product.image || "https://via.placeholder.com/100"
      }];
    }
    
    saveCart(updated);
  };

  const removeFromCart = (id) => {
    if (!id) return;
    saveCart(cartItems.filter((x) => x._id !== id));
  };

  const updateQty = (id, qty) => {
    if (!id) return;
    if (qty < 1) {
      removeFromCart(id);
      return;
    }
    saveCart(cartItems.map((x) => (x._id === id ? { ...x, qty } : x)));
  };

  const clearCart = () => saveCart([]);

  const cartCount = cartItems.reduce((a, x) => a + (x.qty || 1), 0);
  const cartTotal = cartItems.reduce((a, x) => a + ((x.price || 0) * (x.qty || 1)), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQty, 
      clearCart, 
      cartCount, 
      cartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);