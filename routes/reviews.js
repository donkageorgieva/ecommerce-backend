const express = require("express");
const reviewController = require("../cotrollers/reviews");
const router = express.Router();

router.get("/reviews", reviewController.getReviews);
router.post("/reviews", reviewController.postReview);

module.exports = router;
