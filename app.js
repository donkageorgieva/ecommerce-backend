const express = require("express");
const sneakerRoutes = require("./routes/sneakers");
const reviewRoutes = require("./routes/reviews");
const app = express();

app.use(express.json());
app.use("/items", sneakerRoutes);
app.use("/item", reviewRoutes);
app.listen(8080);
