const PeriodModel = require('../models/Period');
const ProjectModel = require('../models/Project');
const UserModel = require('../models/User');

module.exports = async ctx => {
  try {
    const { PO, name, uiName } = ctx.request.body;
    const projects = await ProjectModel.find({ name }).populate({
      path: 'period', populate: { path: "user" }
    });
    const freshProjects = projects.map(proj => ({ ...proj, uiName }));
    await ProjectModel.insertMany(freshProjects);

    const projectsWithNewNames = await ProjectModel.find({ name }).populate({
      path: 'period', populate: { path: "user" }
    });
    const noRepeatingProjects = projectsWithNewNames.filter((project, index, self) =>
      index === self.findIndex((t) => (
        t.PO === project.PO
      ))
    );
    ctx.body = noRepeatingProjects;
  } catch (error) {
    console.error(error);
  }
};
