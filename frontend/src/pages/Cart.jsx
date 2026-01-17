import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  if (cart.length === 0) {
    return <h2 className="page">Cart is Empty</h2>;
  }
  return (
    <div className="page">
      <h3>Your Cart</h3>
      {cart.map((item) => (
        <div key={item.id} style={{ marginBottom: "10px" }}>
          <h4>{item.name}</h4>
          <p>
            ₹{item.price}*{item.qty}
          </p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}

      <h3>Total:₹{total}</h3>
    </div>
  );
}
