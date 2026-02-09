import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    

    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      // 🔐 TOKEN SAVE
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

    window.location.href = "/";

      // ✅ REDIRECT
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={page}>
      {/* Animated blobs */}
      <motion.div
        style={blob1}
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        style={blob2}
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Login Card */}
      <motion.form
        onSubmit={handleLogin}
        style={card}
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Welcome Back</h2>
        <p style={{ opacity: 0.7, marginBottom: 20 }}>
          Login to continue shopping
        </p>

        {error && <p style={{ color: "crimson", marginBottom: 10 }}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          style={input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          style={input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={btn}
        >
          Login
        </motion.button>

        <p style={{ marginTop: 14, fontSize: 14 }}>
          New here?{" "}
          <Link to="/register" style={{ color: "var(--primary)" }}>
            Create account
          </Link>
        </p>
      </motion.form>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
};

const card = {
  width: 360,
  padding: 30,
  borderRadius: 20,
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  boxShadow: "0 30px 60px var(--shadow)",
  color: "var(--text)",
  zIndex: 2,
};

const input = {
  width: "93%",
  padding: 12,
  marginBottom: 14,
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.3)",
  background: "transparent",
  color: "var(--text)",
  outline: "none",
};

const btn = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "none",
  background: "var(--primary)",
  color: "#000",
  fontWeight: 700,
  cursor: "pointer",
};

/* ===== BLOBS ===== */

const blobCommon = {
  position: "absolute",
  width: 260,
  height: 260,
  borderRadius: "50%",
  filter: "blur(90px)",
  opacity: 0.6,
};

const blob1 = {
  ...blobCommon,
  background: "#ff9900",
  top: "-60px",
  left: "-60px",
};

const blob2 = {
  ...blobCommon,
  background: "#00c6ff",
  bottom: "-60px",
  right: "-60px",
};
