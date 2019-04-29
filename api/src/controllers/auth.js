require("dotenv").config();

const secret = process.env.JWT_SECRET;
const validateLoginInput = require("../validation/login");
const jsonwebtoken = require("jsonwebtoken");
const CredModel = require("../models/Creds");

exports.authLogin = async ctx => {
  try {
    const { errors, isValid } = validateLoginInput(ctx.request.body);
    // Check Validation
    if (!isValid) {
      ctx.status = 400;
      return (ctx.body = errors);
    }
    const login = ctx.request.body.login.toUpperCase();
    const { password } = ctx.request.body;
    const user = await CredModel.findOne({
      "sso.login": login,
      "sso.password": password
    });
    if (!user) {
      ctx.status = 403;
      return (ctx.body = { msg: "Wrong login or password" });
    }
    const jwt = jsonwebtoken.sign(
      {
        id: user.id,
        email: user.emailToSubscribe,
        login: user.sso.login,
        role: user.role
      },
      secret,
      { expiresIn: "1d" }
    );
    return (ctx.body = jwt);
  } catch (error) {
    ctx.status = 403;
    ctx.body = { msg: "Wrong login or password" };
    console.log(error);
  }
};
