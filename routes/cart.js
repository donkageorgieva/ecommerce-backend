const express = require("express");
const router = express.Router();
const cartController = require("../cotrollers/cart");
const isAuth = require("../middleware/isAuth");
router.get("/", isAuth, cartController.getCart);
// router.post("/set-cart", cartController.postCart);
router.post("/", isAuth, cartController.postCart);
router.post("/add-to-cart", isAuth, cartController.postCartItem);

module.exports = router;
