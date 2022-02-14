require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const sneakerRoutes = require("./routes/sneakers");
const cartRoutes = require("./routes/cart");
const authRoutes = require("./routes/auth");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const app = express();
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);
app.use(helmet());

app.use(
  morgan("combined", {
    stream: accessLogStream,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use("/cart", cartRoutes);
app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  res.status(status).json({ message: message, data: data });
  next();
});
mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@sneakers.y0hjb.mongodb.net/${process.env.DEFAULT_DB}`
  )
  .then((result) => {
    app.listen(process.env.PORT || 8080);
  })
  .catch((err) => {
    throw err;
  });
