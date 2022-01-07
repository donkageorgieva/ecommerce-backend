const Sneakers = require("../models/sneakers");
const User = require("../models/user");
const express = require("express");
exports.getCart = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      res.send(user.cart);
    })
    .catch((err) => {
      err.statusCode = 401;
      throw err;
    });
};

exports.postCart = (req, res, next) => {
  const cart = req.body.cart;
  User.findById(req.userId)
    .then((user) => {
      user.setCart(cart);
    })
    .catch((err) => {
      err.statusCode = 401;
      throw err;
    });
};

exports.postCartItem = (req, res, next) => {
  // const chosenSize = req.body.chosenSize;
  // const amountInCart = req.body.amountInCart;
  Sneakers.findById(req.body.itemId)
    .then((sneaker) => {
      User.findById(req.userId)
        .then((user) => {
          console.log(req.body);
        })
        .catch((err) => {
          err.statusCode = 404;
          throw err;
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
