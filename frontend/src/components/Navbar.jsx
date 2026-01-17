import React from 'react';
import {Link} from "react-router-dom";
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

export default function Navbar() {
  const{cart}=useContext(CartContext);
  return (
    <div>
    <nav className='navbar' >
        <Link to="/home" >Home</Link>
        <Link to="/cart">Cart({cart.length})</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        
    </nav>
    </div>
  );
}
