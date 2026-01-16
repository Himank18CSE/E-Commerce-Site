import React, { useState } from 'react'
import products from '../data/products';
import Productcard from '../components/Productcard';

export default function Home() {
    const[cart,setcart]=useState([]);
    const addToCart=(product)=>{
        setcart([...cart,product]);
        alert("Product Added to cart ");
    };
  return (
    <div className='products-container'>
        {products.map((product)=>(
            <Productcard
            key={product.id}
            product={product}
            addToCart={addToCart}
            />
        ))}
    </div>
  );
}
