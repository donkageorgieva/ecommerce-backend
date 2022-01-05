const express = require("express");
const router = express.Router();
const cartController = require("../cotrollers/cart");
const isAuth = require("../middleware/isAuth");
router.get("/", cartController.getCart);
// router.post("/set-cart", cartController.postCart);
router.post("/add-to-cart", isAuth, cartController.postCart);

module.exports = router;
