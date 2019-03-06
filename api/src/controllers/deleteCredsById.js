const CredsModel = require('../models/Creds');

module.exports = async ctx => {
  try {
    const { email, password } = ctx.request.body
    const creds = await CredsModel.find({ login: email });
    if (password !== creds.password) {
      return ctx.body = {
        status: "failed",
        message: "Passwords are not matching"
      }
    };
    if (creds) {
      await CredsModel.findByIdRemove(creds.id);
      ctx.body = {
        status: "succeed",
        message: "Credentials have been removed"
      };
    } else {
      ctx.body = {
        status: "failed",
        message: "Credentials haven't been founded"
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
