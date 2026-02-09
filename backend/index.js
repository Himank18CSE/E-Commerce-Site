const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
require("dotenv").config();
const router1 = require("./routes/auth")
const router2 = require("./routes/user")
const router3=require('./routes/product')
const router4 = require('./routes/order')
const uri = process.env.MONGO_URI;

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGO CONNECTED");
  } catch (err) {
    console.error(err);
  }
};

connectDB();

app.use(express.json());

app.use(cors());

app.use("/auth", router1);
app.use("/user", router2);
app.use("/product",router3);
app.use("/orders", router4)

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/hello", (req, res) => {
  res.send("hello");
});




app.listen(5000, () => {
  console.log("Server running on port 5000");
});
