const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // 🔐 Logged-in user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🛒 Products in order
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
      },
    ],

    // 📍 Delivery address
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
    },

    // 💰 Total price
    totalAmount: {
      type: Number,
      required: true,
    },

    // 💳 Payment
    paymentMethod: {
      type: String,
      enum: ["COD", "UPI"],
      default: "COD",
    },

    // 🚚 Order status
    status: {
      type: String,
      default: "Pending", // Pending | Shipped | Delivered
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
