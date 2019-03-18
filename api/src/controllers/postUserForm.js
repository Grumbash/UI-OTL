const UserModel = require('../models/User');
const PeriodModel = require('../models/Period');
const ProjectModel = require('../models/Project');
module.exports = async ctx => {
  try {
    const { body } = ctx.request;
    console.log(body)
  } catch (error) {
    console.error(error);
  }
};
