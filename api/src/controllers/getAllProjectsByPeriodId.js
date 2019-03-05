const PeriodModel = require('../models/Period');
const ProjectModel = require('../models/Project');
const UserModel = require('../models/User');

module.exports = async ctx => {
  try {
    const { periodId } = ctx.params;
    const period = await PeriodModel.findById(periodId);

    const projects = await ProjectModel.find({}).populate({ path: "period", populate: { path: "user" } });

    const porjectsInPeriod = projects.filter(project => project.period.to == period.to);

    const users = await UserModel.find({}).populate({ path: "periods", populate: { path: "projects" } });


    const porjectsInPeriodWithUsers = porjectsInPeriod.map((project, index, arr) => {
      return index === arr.findIndex(elem => elem.PO === project.PO)
    })



    ctx.body = porjectsInPeriodWithUsers;
  } catch (error) {
    console.log(error);
  }
};
