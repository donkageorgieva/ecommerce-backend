const Sneakers = require("../models/sneakers");
const User = require("../models/user");
const express = require("express");
exports.getCart = (req, res, next) => {
  // res.status(200).json(req.user.cart);
};

exports.postCart = (req, res, next) => {
  const chosenSize = req.body.chosenSize;
  const amountInCart = req.body.amountInCart;
  Sneakers.findById(req.body.itemId)
    .then((sneaker) => {
      User.findById(req.userId)
        .then((user) => {
          console.log(amountInCart);
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
