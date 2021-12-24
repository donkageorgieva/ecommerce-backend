const express = require("express");
const sneakersController = require("../cotrollers/sneakers");
const router = express.Router();

router.get("/sneakers", sneakersController.getAllSneakers);
router.post("/add-sneakers", sneakersController.addSneakers);
router.get("/sneakers/view:sneakerId", sneakersController.getSpecificSneakers);
module.exports = router;
