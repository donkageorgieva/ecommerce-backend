exports.getCart = (req, res) => {
  res.status(200).json({
    itemsAmount: 0,
    totalPrice: 0,
    items: [],
  });
};

exports.postCart = (req, res) => {
  res.status(200).json({
    cart: {
      itemsAmount: req.body.itemsAmount,
      totalPrice: req.body.totalPrice,
      items: req.body.items,
    },
    message: "Success!",
  });
};
