const express = require("express");
const sneakerRoutes = require("./routes/sneakers");
const reviewRoutes = require("./routes/reviews");
const app = express();

app.use(express.json());
app.use((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
});
app.use("/items", sneakerRoutes);
app.use("/item", reviewRoutes);
app.listen(8080);
