const PeriodModel = require('../models/Period');
const ProjectModel = require('../models/Project');
const UserModel = require('../models/User');

module.exports = async ctx => {
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
