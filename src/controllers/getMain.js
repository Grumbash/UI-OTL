const UserModel = require("../models/User");
module.exports = async ctx => {
  try {
    const users = await UserModel.find({}).populate({
      path: "periods"
    })
    ctx.render("index", { users });
  } catch (error) {
    console.error(error);
  }
}