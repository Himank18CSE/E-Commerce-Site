import React from 'react';
import {Link} from "react-router-dom";

export default function Navbar() {
  return (
    <div>
    <nav >
        <Link to="/home" >Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        
    </nav>
    </div>
  );
}
