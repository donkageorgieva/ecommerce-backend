require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const sneakerRoutes = require("./routes/sneakers");
const reviewRoutes = require("./routes/reviews");
const cartRoutes = require("./routes/cart");
const User = require("./models/user");
const app = express();

app.use((req, res, next) => {
  User.findOne()
    .then((user) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      req.user = user;
      next();
    })
    .catch((err) => {
      throw new Error(err);
    });
});
app.use("/items", sneakerRoutes);
app.use("/item", reviewRoutes);
app.use("/cart", cartRoutes);

mongoose
  .connect(
    `mongodb+srv://donyg:${process.env.PASSWORD}@sneakers.y0hjb.mongodb.net/shop?retryWrites=true&w=majority`
  )
  .then((result) => {
    User.findOne()
      .then((user) => {
        if (!user) {
          const user = new User({
            name: "Guest",
            email: "Guest email",
            cart: {
              items: [],
              totalPrice: 0,
              itemsAmount: 0,
            },
          });
          user.save();
        }
      })
      .catch((err) => {});
    app.listen(8080);
  })
  .catch((err) => {
    throw new Error(err);
  });
