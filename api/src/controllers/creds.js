const CredsModel = require('../models/Creds');

exports.getCreds = async ctx => {
  try {
    const creds = await CredsModel.find({})
    const credsToreturt = creds.map(cred => ({ login: cred.sso.login, _id: cred.id }))
    ctx.body = credsToreturt;
  } catch (error) {
    console.log(error);
  }
};

exports.postCreds = async ctx => {
  try {
    const { email, password } = ctx.request.body
    const creds = await CredsModel.find({ login: email });
    if (creds) {
      await CredsModel.findByIdAndUpdate(creds.id, { login: email, password });
      ctx.body = {
        status: "succeed",
        message: "Login and password have been created"
      };
    } else {
      await new CredsModel({ login: email, password }).save();
      ctx.body = {
        status: "succeed",
        message: "Login and password have been updated"
      };
    }
  } catch (error) {
    ctx.body = {
      status: "failed",
      message: error
    };
    console.log(error);
  }
};

exports.deleteCredsById = async ctx => {
  try {
    const { id } = ctx.params;
    await CredsModel.findByIdAndRemove(id);
    ctx.body = {
      status: "succeed",
      message: "Credentials have been removed"
    };
  } catch (error) {
    ctx.body = {
      status: "failed",
      message: error
    };
    console.log(error);
  }
};

