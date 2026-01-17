import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import CartProvider from './context/CartContext.jsx'
import ReactDOM from "react-dom/client";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
ReactDOM,createRoot(document.getElementById("root")).render(
  <CartProvider>
    <App />
  </CartProvider>
);
