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
  const updatedCartItems = [...this.cart.items];
  cart.items.forEach((item) => {
    const newItemId = mongoose.Types.ObjectId(item.itemId);
    const itemIndex = this.cart.items.findIndex(
      (i) => i.itemId.toString() === newItemId.toString()
    );
    if (
      itemIndex >= 0 &&
      updatedCartItems[itemIndex].chosenSize === item.chosenSize
    ) {
      console.log("success", itemIndex);
    } else {
      console.log("NOPE", itemIndex);
    }
  });
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
