require('dotenv').config();

const secret = process.env.JWT_SECRET;

const passport = require('koa-passport');
const jsonwebtoken = require("jsonwebtoken");
const CredModel = require("../models/Creds");

module.exports = async ctx => {
  try {
    console.log(ctx.request.body)
    const user = await CredModel.findOne({ "sso.login": ctx.request.body.login, "sso.password": ctx.request.body.password })
    console.log(user)
    const jwt = jsonwebtoken.sign(
      {
        id: user.id,
        email: user.emailToSubscribe,
        login: user.sso.login,
      },
      secret,
      { expiresIn: "1d" }
    );
    return ctx.body = jwt;
  } catch (error) {
    ctx.status = 403;
    ctx.body = { msg: "Wrong login or password" }
    console.log(error)
  }
}