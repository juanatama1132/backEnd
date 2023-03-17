import { Schema, model } from "mongoose";
const collection = "messages";
const MsgSchema = new Schema({
  user: {
    type: String,
    required: true,
    index: true,
  },
  message: {
    type: String,
  },
});
const MsgModel = model(collection, MsgSchema);

export default MsgModel;