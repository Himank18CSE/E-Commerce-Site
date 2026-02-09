import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css'

export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true / false
  }, []);


   const handleLogout = () => {
    localStorage.removeItem("token");
      localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
    window.location.reload();
  };


  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    const { toggleTheme, theme } = useTheme();

  return (
    <nav style={nav}>
      <h2 style={{ color: "#fff" }}>🛒 MyShop</h2>

      <div style={right}>
        <Link to="/" style={link}>
          Home
        </Link>

        <Link to="/cart" style={cartBox}>
          Cart
          {totalItems > 0 && <span style={badge}>{totalItems}</span>}
        </Link>
 {user ? (
          <>
            <span style={userName}>Hi, {user.name}</span>
            <button className="logout-buttton" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={btn}>
            Login
          </Link>
        )}
        <button onClick={toggleTheme}>{theme === "dark" ? "☀️" : "🌙"}</button>
      </div>
    </nav>
  );
}

const nav = {
  height: "60px",
  background: "#111",
  color: "#fff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px",
};

const right = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const btn={
  color: "#fff",
  borderRadius: "50%",
  padding: "2px 6px",
}

const link = {
  color: "#fff",
  textDecoration: "none",
};

const cartBox = {
  position: "relative",
  color: "#fff",
  textDecoration: "none",
};

const badge = {
  position: "absolute",
  top: "-8px",
  right: "-12px",
  background: "red",
  color: "#fff",
  borderRadius: "50%",
  padding: "2px 6px",
  fontSize: "12px",
  
};
  const userName = {
  marginRight: 12,
  fontWeight: 600,
  opacity: 0.9,
};
