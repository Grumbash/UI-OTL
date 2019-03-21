const PeriodModel = require('../models/Period');
const ProjectModel = require('../models/Project');
const UserModel = require('../models/User');

exports.getAllProjectsByPeriodId = async ctx => {
  try {
    const { periodId } = ctx.params;
    const period = await PeriodModel.findById(periodId);

    const projects = await ProjectModel.find({}).populate({ path: "period", populate: { path: "user" } });
    const porjectsInPeriod = projects
      .filter(project => {
        if (!!project.period) {
          return project.period.to == period.to
        }
      })
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

exports.getAllUnicProjects = async ctx => {
  try {
    const projects = await ProjectModel.find({}).populate({
      path: 'period', populate: { path: "user" }
    });
    const noRepeatingProjects = projects.filter((project, index, self) =>
      index === self.findIndex((t) => (
        t.PO === project.PO
      ))
    );
    ctx.body = noRepeatingProjects;
  } catch (error) {
    console.error(error);
  }
};

exports.postToUnicProjects = async ctx => {
  try {
    const { name, uiName } = ctx.request.body;
    const projects = await ProjectModel.find({ name }).populate({
      path: 'period', populate: { path: "user" }
    });
    const freshProjects = projects.map(proj => {
      const result = proj.toObject();
      return {
        ...result, uiName
      }
    });

    for (const proj of freshProjects) {
      await ProjectModel.findOneAndUpdate({ name: proj.name }, { uiName: proj.uiName })
    }

    const allProjects = await ProjectModel.find({}).populate({
      path: 'period', populate: { path: "user" }
    });
    const noRepeatingProjects = allProjects.filter((project, index, self) =>
      index === self.findIndex((t) => (
        t.PO === project.PO
      ))
    );
    ctx.body = noRepeatingProjects;
  } catch (error) {
    console.error(error);
  }
};

exports.getProjectByPO = async ctx => {
  try {
    const { PO } = ctx.params;
    const users = await ProjectModel
      .find({ PO })
      .populate(
        {
          path: 'period',
          populate: {
            path: "user"
          }
        }
      )
      .then(projects => projects.filter((project, index, self) => (
        index === self.findIndex(elem => (
          elem.period.user.name === project.period.user.name
        ))
      )
      )).catch(e => console.log(e));
    ctx.body = users;
  } catch (error) {
    console.log(error);
  }
};