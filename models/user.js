const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        itemId: {
          required: true,
          type: Schema.Types.ObjectId,
          ref: "Sneaker",
        },
        amountInCart: {
          required: true,
          type: Number,
        },
      },
    ],
    itemsAmount: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
});

module.exports = mongoose.model("User", userSchema);