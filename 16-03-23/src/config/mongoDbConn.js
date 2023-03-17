import { connect, Connection } from "mongoose";
const startConnection = async () => {
  try {
    const url =
      "mongodb+srv://fegysin:<Atlas2903db@cluster0.nx5ys0f.mongodb.net/?retryWrites=true&w=majority";
    console.log("Conecting to " + url);
    return await connect(url);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = { startConnection };