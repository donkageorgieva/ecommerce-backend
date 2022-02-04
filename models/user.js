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
  const updatedCart = {
    ...this.cart,
  };

  if (cart.items.length > 0) {
    cart.items.forEach((item) => {
      if (!item) {
        return;
      }

      const itemInCart = updatedCart.items.find((i) => {
        return (
          i.itemId.toString().trim(" ") === item.itemId.toString().trim(" ")
        );
      });

      if (itemInCart !== undefined) {
        console.log("in cart");
        itemInCart.amountInCart = item.amountInCart;
      } else {
        console.log("not in cart");
        updatedCart.items.push(item);
      }
    });
  }

  updatedCart.itemsAmount = cart.itemsAmount;
  updatedCart.totalPrice = cart.totalPrice;
  this.cart = updatedCart;

  return this.save().then((result) => {
    console.log(result, "ressss");
  });
};

module.exports = mongoose.model("User", userSchema);
