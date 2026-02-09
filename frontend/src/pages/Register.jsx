import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });

      // register ke baad login page
      navigate("/login");
    } catch (err) {
      setError("User already exists");
    }
  };

  return (
    <div style={page}>
      <motion.form
        onSubmit={handleRegister}
        style={card}
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Create Account</h2>

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <input
          placeholder="Name"
          style={input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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

        <motion.button whileHover={{ scale: 1.05 }} style={btn}>
          Register
        </motion.button>

        <p style={{ marginTop: 12, fontSize: 14 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--primary)" }}>
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
}

/* same styles as Login */
const page = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const card = {
  width: 360,
  padding: 30,
  borderRadius: 20,
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(18px)",
  boxShadow: "0 30px 60px var(--shadow)",
};
const input = {
  width: "93%",
  padding: 12,
  marginBottom: 14,
  borderRadius: 10,
};
const btn = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  background: "var(--primary)",
  border: "none",
  fontWeight: 700,
};
