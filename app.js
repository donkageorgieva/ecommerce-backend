require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const sneakerRoutes = require("./routes/sneakers");
const reviewRoutes = require("./routes/reviews");
const cartRoutes = require("./routes/cart");
const app = express();
const dbAuth = app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/items", sneakerRoutes);
app.use("/item", reviewRoutes);
app.use("/cart", cartRoutes);

mongoose
  .connect(
    `mongodb+srv://donyg:${process.env.PASSWORD}@sneakers.y0hjb.mongodb.net/shop?retryWrites=true&w=majority`
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    throw new Error(err);
  });
