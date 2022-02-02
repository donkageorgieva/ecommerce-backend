const Sneakers = require("../models/sneakers");
const User = require("../models/user");
const express = require("express");
exports.getCart = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      user.cart.populate("items.itemId").then((result) => {
        res.send(result);
        console.log(result, "result");
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
  User.findById(req.userId)
    .then((user) => {
      return user.addMore(req.body);
    })
    .catch((err) => {
      err.statusCode = 404;
      throw err;
    });
};
