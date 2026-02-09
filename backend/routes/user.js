const express = require("express");
const User = require("../models/User");
const protect = require("../middleware/authmiddleware");

const router = express.Router();

// 🔒 PROTECTED ROUTE
router.get("/profile", protect, async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json(user);
});




module.exports = router;
