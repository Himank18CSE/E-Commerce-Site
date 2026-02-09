const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    description: String,
    price: Number,
    category: String,
    brand: String,
    stock:Number,
    rating:Number,
    images: String,
    
    createdAt: String 
});

module.exports = mongoose.model("Product", productSchema);
