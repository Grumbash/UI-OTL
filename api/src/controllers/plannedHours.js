const PeriodModel = require('../models/Period');
const ProjectModel = require('../models/Project');
const UserModel = require('../models/User');
const plannedHoursValidator = require("../validation/plannedHours");

exports.postPlannedHours = async ctx => {
  try {
    const forntProj = ctx.request.body
    const { errors, isValid } = plannedHoursValidator(forntProj);
    // Check Validation
    if (!isValid) {
      ctx.status = 400;
      return ctx.body = errors;
    }
    const { id } = forntProj;
    const project = await ProjectModel.findOneAndUpdate({ _id: id }, { $set: { planned: forntProj.planned } }, { new: true }).populate({
      path: 'period', populate: { path: "user" }
    });
    ctx.body = project;
  } catch (error) {
    console.error(error);
  }
};
