const express = require("express");
const router = express.Router();
const cartController = require("../cotrollers/cart");

router.get("/", cartController.getCart);
router.post("/", cartController.postCart);

module.exports = router;
