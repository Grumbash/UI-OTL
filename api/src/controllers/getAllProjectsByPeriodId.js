const PeriodModel = require('../models/Period');
const ProjectModel = require('../models/Project');
const UserModel = require('../models/User');

module.exports = async ctx => {
  try {
    const { periodId } = ctx.params;
    const period = await PeriodModel.findById(periodId);

    const projects = await ProjectModel.find({}).populate({ path: "period", populate: { path: "user" } });

    const porjectsInPeriod = projects
      .filter(project => project.period.to == period.to)
      .filter((project, index, arr) => index === arr.findIndex(elem => elem.PO === project.PO));

    const users = await UserModel.find({}).populate({ path: "periods", populate: { path: "projects" } });

    const usersInPeriod = users.filter((user, index, arrSelf) => {
      user.periods = user.periods.filter(project => project.to === period.to)
      return user.periods.length > 0;
    });

    const porjectsInPeriodWithUsers = porjectsInPeriod.map(project => {
      const reProject = { ...project._doc }
      reProject.users = usersInPeriod.filter(user => {
        const filtredProj = user.periods[0].projects.find(proj => proj.PO === reProject.PO);
        if (filtredProj) {
          return true;
        }
        return false;
      })
      return reProject;
    })


    ctx.body = porjectsInPeriodWithUsers;
  } catch (error) {
    console.log(error);
  }
};
