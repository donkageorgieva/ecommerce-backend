const express = require("express");
const sneakersController = require("../cotrollers/sneakers");
const router = express.Router();

router.get("/sneakers", sneakersController.getSneakers);

module.exports = router;
