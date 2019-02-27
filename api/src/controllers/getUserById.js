const PeriodModel = require('../models/Period');
const ProjectModel = require('../models/Project');
const UserModel = require('../models/User');
const moment = require('moment');

module.exports = async ctx => {
  try {
    const { id } = ctx.params;
    const user = await UserModel.findById(id).populate({
      path: 'periods',
      populate: {
        path: 'projects'
      }
    });

    ctx.body = user;
  } catch (error) {
    console.log(error);
  }
};
