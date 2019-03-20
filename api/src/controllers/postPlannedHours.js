const PeriodModel = require('../models/Period');
const ProjectModel = require('../models/Project');
const UserModel = require('../models/User');

module.exports = async ctx => {
  try {
    const forntProj = ctx.request.body
    const { id } = forntProj;
    const project = await ProjectModel.findOneAndUpdate({ _id: id }, { $set: { planned: forntProj.planned } }, { new: true }).populate({
      path: 'period', populate: { path: "user" }
    });
    ctx.body = project;
  } catch (error) {
    ctx.status = 500;
    console.error(error);
  }
};
