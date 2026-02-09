function ProductCard({ product, addToCart }) {
  return (
    <motion.div
      key={item._id}
      style={card}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <img src={item.image} alt={item.title} />

      <img src={item.image} alt={item.name} className="product-image" />

      <h3>{item.name}</h3>
      <p className="price">₹{item.price}</p>

      <button className="add-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </motion.div>
  );
}

export default ProductCard;
