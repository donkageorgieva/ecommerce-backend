require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.get("Authorization")) {
    const error = new Error("Authorization  is required");
    error.statusCode = 401;
    throw error;
  }
  const token = req.get("Authorization").split(" ")[1];
  let decodedtoken;
  try {
    decodedtoken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
  if (!decodedtoken) {
    const error = new Error("not authenticated");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedtoken.userId;
  req.email = decodedtoken.email;

  next();
};
