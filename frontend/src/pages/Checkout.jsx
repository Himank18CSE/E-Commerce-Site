import { useCart } from "../context/CartContext";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Checkout() {
  const { cart, clearCart } = useCart();

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [placed, setPlaced] = useState(false);

  const totalAmount = Number(
    cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  cart.forEach(item => {
  console.log("PRODUCT _ID 👉", item._id, item._id?.length);
});


  /* ================= PLACE ORDER ================= */
  const placeOrder = async () => {
    try {
      setLoading(true);

    
      clearCart();
      setPlaced(true);
    } catch (err) {
      alert("❌ Order failed. Please check details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= SUCCESS ================= */
  if (placed) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={successWrap}
      >
        <div style={successCard}>
          <h2>🎉 Order Placed Successfully</h2>
          <p>Payment Method: {paymentMethod}</p>
          <p>Your order will be delivered soon 🚚</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      style={page}
    >
      <h1>Secure Checkout</h1>

      <div style={layout}>
        {/* ================= ADDRESS ================= */}
        <motion.div style={card} initial={{ x: -30 }} animate={{ x: 0 }}>
          <h3>📍 Delivery Address</h3>

          <textarea
            placeholder="House No, Street, Area"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            style={textarea}
          />

          <input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={input}
          />

          <input
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            style={input}
          />
        </motion.div>

        {/* ================= SUMMARY + PAYMENT ================= */}
        <motion.div style={card} initial={{ x: 30 }} animate={{ x: 0 }}>
          <h3>🧾 Order Summary</h3>

          {cart.map((item) => (
            <div key={item._id} style={row}>
              <span>{item.name} × {item.qty}</span>
              <strong>₹ {item.price * item.qty}</strong>
            </div>
          ))}

          <hr />

          <div style={row}>
            <strong>Total</strong>
            <strong>₹ {totalAmount}</strong>
          </div>

          {/* ===== PAYMENT ===== */}
          <h4 style={{ marginTop: 16 }}>💳 Payment Method</h4>

          <label style={payOption}>
            <input
              type="radio"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            Cash on Delivery
          </label>

          <label style={payOption}>
            <input
              type="radio"
              checked={paymentMethod === "UPI"}
              onChange={() => setPaymentMethod("UPI")}
            />
            UPI (Mock)
          </label>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={placeBtn}
            disabled={
              !street || !city || !pincode || cart.length === 0 || loading
            }
            onClick={placeOrder}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ================= STYLES ================= */

const page = {
  padding: "30px",
  maxWidth: "1100px",
  margin: "auto",
};

const layout = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "24px",
};

const card = {
  background: "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))",
  backdropFilter: "blur(14px)",
  borderRadius: "22px",
  padding: "28px",
  boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
  border: "1px solid rgba(255,255,255,0.12)",
};


const textarea = {
  width: "100%",
  height: "80px",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "12px",
};

const input = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(0,0,0,0.3)",
  color: "white",
  outline: "none",
};


const row = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
};

const payOption = {
  display: "block",
  marginBottom: "8px",
};

const placeBtn = {
  marginTop: "20px",
  width: "100%",
  padding: "16px",
  background: "linear-gradient(135deg, var(--primary), var(--secondary))",
  border: "none",
  borderRadius: "18px",
  fontWeight: "800",
  color: "#000",
  cursor: "pointer",
  boxShadow: "0 0 30px rgba(124,124,255,0.6)",
};

/* ===== SUCCESS ===== */

const successWrap = {
  minHeight: "70vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const successCard = {
  background: "linear-gradient(180deg, #1b1f3b, #0b0f1a)",
  padding: "50px",
  borderRadius: "30px",
  textAlign: "center",
  boxShadow: "0 0 120px rgba(124,124,255,0.4)",
};
