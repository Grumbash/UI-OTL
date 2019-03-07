const PeriodModel = require('../models/Period');
const ProjectModel = require('../models/Project');
const UserModel = require('../models/User');

module.exports = async ctx => {
  try {
    const { id } = ctx.params;
    const period = await PeriodModel.findById(id).populate('projects');
    const user = await UserModel.findById(period.user);
    period.user = user;

    ctx.body = period;
  } catch (error) {
    console.log(error);
  }
};