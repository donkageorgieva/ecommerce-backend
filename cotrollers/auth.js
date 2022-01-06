require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
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

exports.login = (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("User does not exist");
        error.statusCode = 404;
        throw error;
      }

      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isAuth) => {
      if (!isAuth) {
        const error = new Error("Invalid password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        `${process.env.SECRET}`,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
