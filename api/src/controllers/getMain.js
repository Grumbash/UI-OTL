const UserModel = require('../models/User');
const PeriodModel = require('../models/Period');
module.exports = async ctx => {
  try {
    const users = await UserModel.find({}).populate({
      path: 'periods'
    });
    ctx.body = users;
  } catch (error) {
    console.error(error);
  }
};
