exports.getSneakers = (req, res, next) => {
  res.status(200).json({
    items: [
      {
        amountInCart: 0,
        id: 1,
        name: "Jordan 1 High",
        price: 196,
        sizes: [39, 40],
        url: "https://imgur.com/Fmk3fWp.jpg",
      },
      {
        amountInCart: 0,
        id: 2,
        name: "Nike Air Force 1 Pastel",
        price: 98,
        sizes: [38, 39, 40],
        url: "https://imgur.com/GsepK5W.jpg",
      },
      {
        amountInCart: 0,
        id: 3,
        name: "Nike Air Max 1",
        price: 95,
        sizes: [40, 42],
        url: "https://imgur.com/9SkvF2k.jpg",
      },
      {
        amountInCart: 0,
        id: 4,
        name: "Nike Air Force 1 Sketch",
        price: 99,
        sizes: [38, 41, 42],
        url: "https://imgur.com/jGSuNqz.jpg",
      },
    ],
  });
};
