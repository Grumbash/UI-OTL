const PeriodModel = require("../models/Period");
const ProjectModel = require("../models/Project");
const UserModel = require("../models/User");
const mongoose = require("mongoose");
const cmd = require("../utils/cmdPromise");

require("dotenv/config");

exports.startParser = async ctx => {
  try {
    console.log("lol");
    ctx.body = "lol";
    await cmd(process.env.CMD_COMMAND_START);
  } catch (error) {
    console.log(error);
  }
};
