const UserModel = require("../models/User");
const moment = require("moment");
module.exports = async ctx => {
  const users = await UserModel.find({})
  console.log(users[1].periods)
  ctx.render("index", { users });
}