const sneakers = require("../models/sneakers");
const Sneaker = require("../models/sneakers");
const mongoose = require("mongoose");
exports.addSneakers = (req, res, next) => {
  const sneakers = req.body.sneakers.map((s) => {
    return new Sneaker({
      name: s.name,
      price: s.price,
      url: s.url,
      sizes: s.sizes,
    });
  });
  return Sneaker.insertMany(sneakers);
};

exports.getAllSneakers = (req, res, next) => {
  Sneaker.find().then((sneakers) => {
    res.send(sneakers);
  });
};
exports.getSpecificSneakers = (req, res, next) => {
  const id = req.params.sneakerId;
  Sneaker.findById(id).then((sneaker) => {
    res.status(200).send(sneaker);
  });
};
