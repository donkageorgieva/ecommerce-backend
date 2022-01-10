const mongoose = require("mongoose");
const Sneakers = require("./sneakers");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
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
          type: Number,
        },
        chosenSize: {
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
userSchema.methods.setCart = function (cart) {
  console.log(cart, "CARTTTTTTTTTTT");
  this.cart = {
    ...this.cart,
    items: cart.items,
    itemsAmount: cart.itemsAmount,
    totalPrice: cart.totalPrice,
  };
  return this.save();
};
userSchema.methods.addToCart = function (product) {};
module.exports = mongoose.model("User", userSchema);
