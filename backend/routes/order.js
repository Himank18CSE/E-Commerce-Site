const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

/*
  POST /api/orders
  Place new order
*/
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { products, address, totalAmount, paymentMethod } = req.body;

    // 🔎 Basic validation
    if (!products || products.length === 0) {
      return res.status(400).json({ msg: "No products in order" });
    }

    if (
      !address ||
      !address.street ||
      !address.city ||
      !address.pincode
    ) {
      return res.status(400).json({ msg: "Complete address required" });
    }

    if (!totalAmount) {
      return res.status(400).json({ msg: "Total amount required" });
    }

    // 🔥 Validate ObjectId properly
    const formattedProducts = products.map((item) => {
      if (!mongoose.Types.ObjectId.isValid(item.product)) {
        throw new Error("Invalid product ObjectId");
      }

      return {
        product: item.product,
        name: item.name,
        price: Number(item.price),
        qty: Number(item.qty),
      };
    });

    const order = await Order.create({
      user: req.user.id, // JWT se aata hai
      products: formattedProducts,
      address: {
        street: address.street.trim(),
        city: address.city.trim(),
        pincode: String(address.pincode).trim(),
      },
      totalAmount: Number(totalAmount),
      paymentMethod: paymentMethod || "COD",
    });

    res.status(201).json({
      msg: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error("❌ ORDER ERROR:", err.message);
    res.status(400).json({
      msg: "Order failed",
      error: err.message,
    });
  }
});

module.exports = router;
