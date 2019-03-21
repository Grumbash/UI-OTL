const UserModel = require('../models/User');
const PeriodModel = require('../models/Period');
const ProjectModel = require('../models/Project');
const CredModel = require("../models/Creds");
const validateCredsUpdate = require("../validation/credsUpdate");

exports.postUserForm = async ctx => {
  try {
    const { body } = ctx.request;

    const { errors, isValid } = validateCredsUpdate(ctx.request.body);
    // Check Validation
    if (!isValid) {
      ctx.status = 400;
      return ctx.body = errors;
    }
    console.log(body);
    const credsOfUser = await CredModel.findOne({ "sso.login": body.sso.login });

    ctx.status = 200;

    if (!credsOfUser) {
      ctx.status = 400;
      return ctx.body = { msg: "No user with such sso login wasn't found" }
    }
    const fields = {
      sso: {
        login: body.sso.login,
        password: body.sso.newPassword,
      },
      vpn: {
        login: body.vpn.login,
        password: body.vpn.newPassword,
      },
      emailToSubscribe: body.emailToSubscribe,
      expire: body.expireDate,
    };
    if (fields.sso.password !== credsOfUser.sso.password) {
      ctx.status = 400;
      return ctx.body = { msg: "SSO passwords do not match" };
    }
    await CredModel.findOneAndUpdate({ _id: credsOfUser.id },
      { $set: fields },
      { new: true });

    return ctx.body = { msg: "Credentials were successfully updated" };
  } catch (error) {
    console.error(error);
  }
};
