const PeriodModel = require('../models/Period');
const ProjectModel = require('../models/Project');
const UserModel = require('../models/User');

module.exports = async ctx => {
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
