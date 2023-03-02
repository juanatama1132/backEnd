import { Schema, model } from "mongoose";
const collection = "carts";
const CartSchema = new Schema({});
const CartModel = model(collection, CartSchema);

module.exports = { CartModel };