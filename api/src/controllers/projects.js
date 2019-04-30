const PeriodModel = require("../models/Period");
const ProjectModel = require("../models/Project");
const UserModel = require("../models/User");

exports.getAllProjectsByPeriodId = async ctx => {
  try {
    const { periodId } = ctx.params;
    const period = await PeriodModel.findById(periodId);

    const projects = await ProjectModel.find({}).populate({
      path: "period",
      populate: { path: "user" }
    });
    const projectsInPeriod = projects
      .filter(project => {
        if (!!project.period) {
          return project.period.to == period.to;
        }
      })
      .filter(
        (project, index, arr) =>
          index === arr.findIndex(elem => elem.PO === project.PO)
      );

    const users = await UserModel.find({}).populate({
      path: "periods",
      populate: { path: "projects" }
    });

    const usersInPeriod = users.filter((user, index, arrSelf) => {
      user.periods = user.periods.filter(project => project.to === period.to);
      return user.periods.length > 0;
    });

    const projectsInPeriodWithUsers = projectsInPeriod.map(project => {
      const reProject = { ...project._doc };
      reProject.users = usersInPeriod.filter(user => {
        const filtredProj = user.periods[0].projects.find(
          proj => proj.PO === reProject.PO
        );
        if (filtredProj) {
          return true;
        }
        return false;
      });
      return reProject;
    });

    ctx.body = projectsInPeriodWithUsers;
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUnicProjects = async ctx => {
  try {
    const projects = await ProjectModel.find({}).populate({
      path: "period",
      populate: { path: "user" }
    });
    const noRepeatingProjects = projects.filter(
      (project, index, self) =>
        index === self.findIndex(t => t.PO === project.PO)
    );
    ctx.body = noRepeatingProjects;
  } catch (error) {
    console.error(error);
  }
};

exports.postToUnicProjects = async ctx => {
  try {
    const { name, uiName, PM, uiNameForRead } = ctx.request.body;
    const projects = await ProjectModel.find({ name }).populate({
      path: "period",
      populate: { path: "user" }
    });
    const freshProjects = projects.map(proj => {
      const result = proj.toObject();
      return {
        ...result,
        uiName,
        PM,
        uiNameForRead
      };
    });

    for (const proj of freshProjects) {
      await ProjectModel.findOneAndUpdate(
        { name: proj.name },
        {
          uiName: proj.uiName,
          PM: proj.PM,
          uiNameForRead: proj.uiNameForRead
        }
      );
    }

    const allProjects = await ProjectModel.find({}).populate({
      path: "period",
      populate: { path: "user" }
    });
    const noRepeatingProjects = allProjects.filter(
      (project, index, self) =>
        index === self.findIndex(t => t.PO === project.PO)
    );
    ctx.body = noRepeatingProjects;
  } catch (error) {
    console.error(error);
  }
};

exports.getProjectByPO = async ctx => {
  try {
    const { PO } = ctx.params;
    const project = await ProjectModel.find({ PO })
      .populate({
        path: "period",
        populate: {
          path: "user"
        }
      })
      .then(projects =>
        projects.filter(
          (project, index, self) =>
            index ===
            self.findIndex(
              elem => elem.period.user.name === project.period.user.name
            )
        )
      )
      .catch(e => console.log(e));
    ctx.body = project;
  } catch (error) {
    console.log(error);
  }
};

exports.getUserByProjectPO = async ctx => {
  try {
    const { PO, id } = ctx.params;
    const user = await UserModel.findById(id).populate({
      path: "periods",
      populate: { path: "projects" }
    });
    user.periods = user.periods
      .map(period => {
        period.projects = period.projects === null ? [] : period.projects;
        period.projects = period.projects.filter(project => project.PO === +PO);

        return period;
      })
      .filter(({ projects }) => {
        if (!projects || projects.length === 0) {
          return false;
        } else {
          return true;
        }
      });
    ctx.body = user;
  } catch (error) {
    console.log(error);
  }
};
