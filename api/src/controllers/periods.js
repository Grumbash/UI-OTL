const PeriodModel = require ('../models/Period');
const ProjectModel = require ('../models/Project');
const UserModel = require ('../models/User');
const mongoose = require ('mongoose');

exports.getAllUnicPeriods = async ctx => {
  try {
    const periods = await PeriodModel.find ({}).populate ({
      path: 'user',
    });
    const noRepeatingPeriods = periods.filter (
      (period, index, self) =>
        index ===
        self.findIndex (t => t.from === period.from && t.to === period.to)
    );

    ctx.body = noRepeatingPeriods;
  } catch (error) {
    console.error (error);
  }
};

exports.getPeriodById = async ctx => {
  try {
    const {id} = ctx.params;
    const period = await PeriodModel.findById (id).populate ('projects');
    const user = await UserModel.findById (period.user);
    period.user = user;

    ctx.body = period;
  } catch (error) {
    console.error (error);
  }
};

exports.getPeriodScreenByPeriodId = async ctx => {
  try {
    const {periodId} = ctx.params;
    console.log (periodId);
    const [screen] = await PeriodModel.aggregate ([
      {
        $match: {
          _id: mongoose.Types.ObjectId (periodId),
        },
      },
      {
        $project: {
          screenshot: true,
        },
      },
    ]);
    ctx.body = screen.screenshot;
  } catch (error) {
    console.error (error);
  }
};
