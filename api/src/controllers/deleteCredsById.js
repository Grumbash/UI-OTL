const CredsModel = require('../models/Creds');

module.exports = async ctx => {
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
