import MsgModel from "../models/message.model.js";
class MsgMannager {
  constructor() {
    this.messages = [];
  }
  addMsg = () => {
    return MsgModel.create(user, message);
  };
  getMgs = () => {
    return MsgModel.find({}).lean();
  };
}
const MsgManager = new MsgMannager();
export default MsgManager;