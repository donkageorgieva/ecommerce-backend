const express = require("express");
const sneakerRoutes = require("./routes/sneakers");
const reviewRoutes = require("./routes/reviews");
const cartRoutes = require("./routes/cart");
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/items", sneakerRoutes);
app.use("/item", reviewRoutes);
app.use("/cart", cartRoutes);
app.listen(8080);
