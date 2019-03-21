const PeriodModel = require('../models/Period');
const ProjectModel = require('../models/Project');
const UserModel = require('../models/User');

exports.getAllUnicPeriods = async ctx => {
  try {
    const periods = await PeriodModel.find({}).populate({
      path: 'user'
    });
    const noRepeatingPeriods = periods.filter((period, index, self) =>
      index === self.findIndex((t) => (
        t.from === period.from && t.to === period.to
      ))
    );

    ctx.body = noRepeatingPeriods;
  } catch (error) {
    console.error(error);
  }
};

exports.getPeriodById = async ctx => {
  try {
    const { id } = ctx.params;
    const period = await PeriodModel.findById(id).populate('projects');
    const user = await UserModel.findById(period.user);
    period.user = user;

    ctx.body = period;
  } catch (error) {
    console.log(error);
  }
};