const User = require("../models/user");
const { validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    const error = new Error("validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const password = req.body.password;
  const email = req.body.email;
  const cart = req.body.cart
    ? req.body.cart
    : {
        items: [],
        itemsAmount: 0,
        totalPrice: 0,
      };

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        password: hashedPassword,
        email: email,
        cart: cart,
      });
      return user.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "User created", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
