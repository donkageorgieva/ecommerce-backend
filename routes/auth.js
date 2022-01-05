const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authController = require("../cotrollers/auth");
const User = require("../models/user");
router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            console.log(userDoc, "EXIST");
            return Promise.reject("Email already in use");
          } else {
            console.log(userDoc, "NOT");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
  ],
  authController.signup
);
router.post("/login", authController.login);
module.exports = router;
