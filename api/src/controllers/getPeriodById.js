const PeriodModel = require('../models/Period');
const ProjectModel = require('../models/Project');
const UserModel = require('../models/User');
const moment = require('moment');

module.exports = async ctx => {
  try {
    const { id } = ctx.params;
    const period = await PeriodModel.findById(id).populate('projects');

    ctx.body = period;
  } catch (error) {
    console.log(error);
  }
};
