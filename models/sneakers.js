const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakersSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  url: {
    required: true,
    type: String,
  },
  sizes: {
    required: false,
    type: Array,
  },
});

module.exports = mongoose.model("Sneaker", sneakersSchema);
