const UserModel = require('../models/User');
const PeriodModel = require('../models/Period');
module.exports = async ctx => {
  try {
    const period = await PeriodModel.find({}).populate({
      path: 'user'
    });
    ctx.body = period;
  } catch (error) {
    console.error(error);
  }
};
