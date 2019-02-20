const PeriodModel = require('../models/Period');
const ProjectModel = require('../models/Project');
const UserModel = require('../models/User');
const moment = require('moment');

module.exports = async ctx => {
  try {
    const { id } = ctx.params;
    const user = await UserModel.findById(id).populate({
      path: "periods", populate: {
        path: "projects"
      }
    });;

    await ctx.render('blocks/user', { user, moment });

  } catch (error) {
    console.log(error);
  }
}