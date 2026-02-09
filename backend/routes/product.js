const express= require("express");
const router=express.Router();
const Product = require("../models/Product")

//post mtlb add products
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//get prooducts
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//category wala scene 
router.get("/category/:cat", async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.cat,
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;