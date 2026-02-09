import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import CategoryNav from "../components/CategoryNav";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const { addToCart } = useCart();

 useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:5000/product");
      // console.log("PRODUCTS 👉", res.data);
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const filteredProducts = 
    category === "all"
      ? products
      : products.filter((item) => item.category.toLowerCase() === category);

  return (
    <div className="card">
     

        <CategoryNav setCategory={setCategory} active={category} />
        

         <div style={{ padding: "20px" }}>
        <h1>Products</h1>

        
        {/* GRID */}
        <div style={gridStyle}>
          {filteredProducts.map((item) => (

            <div key={item._id} style={cardStyle}>
              <img src={item.images} alt={item.name} style={imgStyle} />
             
              
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <button style={add}
                onClick={() => {
                  // console.log("ADDING ", item);
                   console.log(item.images);
                  addToCart(item);
                }}
              >
                Add to Cart
              </button>
            </div>
            
          ))}
        </div>
      </div>
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "20px",
};



const imgStyle = {
 width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "10px",
    display: "block",     
  }


const cardStyle = {
  background: "var(--card)",
  borderRadius: 14,
  padding: 14,
  boxShadow: "0 12px 30px var(--shadow)",
  color: "var(--text)",         
  overflow: "hidden",           
};

const add = {
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

