require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const sneakerRoutes = require("./routes/sneakers");
const reviewRoutes = require("./routes/reviews");
const cartRoutes = require("./routes/cart");
const authRoutes = require("./routes/auth");
const User = require("./models/user");
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATCH, PUT"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.use("/items", sneakerRoutes);
app.use("/item", reviewRoutes);
app.use("/cart", cartRoutes);
app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  res.status(status).json({ message: message, data: data });
  next();
});
mongoose
  .connect(
    `mongodb+srv://donyg:${process.env.PASSWORD}@sneakers.y0hjb.mongodb.net/shop?retryWrites=true&w=majority`
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
