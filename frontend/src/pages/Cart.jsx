import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";



export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleCheckout = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login to continue");
    navigate("/login");
  } else {
    navigate("/checkout");
  }
};


  // EMPTY CART
  if (cart.length === 0) {
    return (
      <div style={container}>
        <h2>🛒 Your cart is empty</h2>
        <Link to="/">
          <button style={btn}>Go to Products</button>
        </Link>
      </div>
    );
  }

  return (
     


    <div style={container}>
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div key={item._id} style={card}>
          <img
            src={item.image}
            alt={item.name}
            style={img}
          />

          <div style={{ flex: 1 }}>
            <h3>{item.name}</h3>
            <p>₹ {item.price}</p>

            <div style={qtyBox}>
              <button
                style={qtyBtn}
                onClick={() => decreaseQty(item._id)}
                disabled={item.qty === 1}
              >
                −
              </button>

              <span>{item.qty}</span>

              <button
                style={qtyBtn}
                onClick={() => increaseQty(item._id)}
              >
                +
              </button>
            </div>

            <button
              style={removeBtn}
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h2>Total: ₹ {total}</h2>

      <Link to="/checkout">
        <motion.button onClick={handleCheckout}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={checkoutBtn}>Proceed to Checkout</motion.button>
      </Link>
    </div>

  );
}

/* ================= STYLES ================= */

const container = {
  maxWidth: "900px",
  margin: "auto",
  padding: "20px",
};

const card = {
  display: "flex",
  gap: "20px",
  border: "1px solid #ddd",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "8px",
};

const img = {
  width: "120px",
  height: "120px",
  objectFit: "cover",
  borderRadius: "6px",
};

const qtyBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  margin: "10px 0",
};

const qtyBtn = {
  padding: "4px 10px",
  cursor: "pointer",
};

const removeBtn = {
  background: "crimson",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer",
};

const btn = {
  padding: "10px 20px",
  cursor: "pointer",
};

const checkoutBtn = {
  marginTop: "20px",
  padding: "12px 20px",
  background: "green",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
