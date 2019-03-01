const PeriodModel = require('../models/Period');
const ProjectModel = require('../models/Project');
const UserModel = require('../models/User');

module.exports = async ctx => {
  try {
    const { PO } = ctx.params;
    const project = await ProjectModel.find({ PO }).populate({ path: 'period', populate: { path: "user" } });
    ctx.body = project;
  } catch (error) {
    console.log(error);
  }
};
