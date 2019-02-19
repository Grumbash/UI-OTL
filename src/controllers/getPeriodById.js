const PeriodModel = require("../models/Period");
const ProjectModel = require("../models/Project");
const UserModel = require("../models/User");

module.exports = async ctx => {
  try {
    const { id } = ctx.params;
    const period = await PeriodModel.findById(id).populate('projects');

    ctx.render(
      "fullInfo",
      {
        period
      }
    );
  } catch (error) {
    console.log(error)
  }
}