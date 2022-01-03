exports.getCart = (req, res, next) => {
  // res.status(200).json(req.user.cart);
};

exports.postCart = (req, res, next) => {
  const product = {
    itemId: req.body._id,
    price: req.body.price,
    amountInCart: req.body.amountInCart,
    chosenSize: parseInt(req.body.chosenSize),
  };
  req.user.addToCart(product);
};
