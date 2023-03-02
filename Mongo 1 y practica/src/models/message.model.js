import { Schema, model } from "mongoose";
const collection = "messages";
const MsgSchema = new Schema({});
const MsgModel = model(collection, MsgSchema);

module.exports = { MsgModel };