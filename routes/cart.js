const express = require("express");
const router = express.Router();
const cartController = require("../cotrollers/cart");
const isAuth = require("../middleware/isAuth");
router.get("/", isAuth, cartController.getCart);

router.put("/", isAuth, cartController.postCart);

module.exports = router;
