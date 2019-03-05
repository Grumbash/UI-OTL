const CredsModel = require('../models/Creds');


module.exports = async ctx => {
  try {
    const { email, password } = ctx.request.body
    const creds = await CredsModel.find({ login: email });
    if (creds) {
      // await CredsModel.findByIdAndUpdate(creds.indexOf, { login: email, password });
      ctx.body = {
        status: "succeed",
        message: "Login and password have been created"
      };
    } else {
      // await new CredsModel({ login: email, password }).save();
      ctx.body = {
        status: "succeed",
        message: "Login and password have been updated"
      };
    }
  } catch (error) {
    ctx.body = {
      status: "failed",
      message: error
    };;
    console.log(error);
  }
};
