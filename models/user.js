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
      const newItemId = mongoose.Types.ObjectId(item.itemId);
      const itemIndex = this.cart.items.findIndex(
        (i) => i.itemId.toString() === newItemId.toString()
      );

      if (itemIndex >= 0) {
        updatedCart.items[itemIndex].amountInCart += item.amountInCart;
        updatedCart.totalPrice +=
          updatedCart.items[itemIndex].price *
          updatedCart.items[itemIndex].amountInCart;
        updatedCart.amountInCart += updatedCart.items[itemIndex].amountInCart;
      } else {
        updatedCart.items.push(item);
        updatedCart.totalPrice += item.amountInCart * item.price;
        updatedCart.amountInCart += item.amountInCart;
      }
    });
  }

  updatedCart.itemsAmount = cart.itemsAmount;
  this.cart = updatedCart;

  return this.save();
};
userSchema.methods.addMore = function (productInfo) {
  console.log(productInfo, "productInfo");
  Sneakers.findById(productInfo.itemId)
    .then((sneaker) => {
      const updatedCart = {
        ...this.cart,
      };
      const currItem = updatedCart.items.find((item) => {
        return item.itemId.toString().trim("") == productInfo.itemId.trim("");
      });
      currItem.amountInCart = productInfo.amountInCart;
      updatedCart.itemsAmount += 1;
      updatedCart.totalPrice += sneaker.price;
      this.cart = updatedCart;

      return this.save();
    })
    .catch((err) => {
      throw err;
    });
};
module.exports = mongoose.model("User", userSchema);
