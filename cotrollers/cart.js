const Sneakers = require("../models/sneakers");
const User = require("../models/user");
const express = require("express");
exports.getCart = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      user.cart.populate("items.itemId").then((result) => {
        console.log(result);
        res.send(result);
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
