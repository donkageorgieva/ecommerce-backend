exports.getReviews = (req, res) => {
  res.status(200).json({
    reviews: [
      { comment: "Great shoes!", rating: 5 },
      { comment: "", rating: 5 },
    ],
  });
};
exports.postReview = (req, res) => {
  res.status(201).json({
    review: {
      id: new Date().toISOString(),
      comment: comment,
      rating: rating,
    },
  });
};
