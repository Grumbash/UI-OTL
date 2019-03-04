const UserModel = require('../models/User');
const PeriodModel = require('../models/Period');
module.exports = async ctx => {
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
