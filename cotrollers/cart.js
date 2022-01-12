const Sneakers = require("../models/sneakers");
const User = require("../models/user");
const express = require("express");
exports.getCart = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      user.cart.populate("items.itemId").then((result) => {
        res.send(user.cart);
        console.log(user.cart, "userCart");
      });
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
      if (user) {
        return user.setCart(cart);
      }
    })
    .catch((err) => {
      err.statusCode = 401;
      throw err;
    });
};

exports.postCartItem = (req, res, next) => {
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
