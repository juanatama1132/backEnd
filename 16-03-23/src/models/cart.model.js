import { Schema, model } from "mongoose";
const collection = "carts";
const CartSchema = new Schema({
  // userId2:{type: Schema.Types.ObjectId, ref: "users" },
  userId: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  cartId: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  // eMail: { type: String, required: true },
  products: {
    type: [
      {
        prodId: { type: Schema.Types.ObjectId, ref: "products" },
        code: { type: String, required: true, unique: true },
        quantity: { type: Number, default: 0 },
      },
    ],
  },
  cartTotal: { type: Number, default: 0 },
  purchased: {
    type: Boolean,
    default: false,
  },
});
CartSchema.pre("find", function () {
  this.populate("products._id");
  // this.populate("products.code").populate("users.userId");
});
const CartModel = model(collection, CartSchema);

export default CartModel;