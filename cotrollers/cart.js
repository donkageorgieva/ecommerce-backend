exports.getCart = (req, res, next) => {
  res.status(200).json(req.user.cart);
};

exports.postCart = (req, res) => {};
