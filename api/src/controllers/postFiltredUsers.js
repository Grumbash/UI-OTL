const UserModel = require('../models/User');
const PeriodModel = require('../models/Period');
const ProjectModel = require('../models/Project');
module.exports = async ctx => {
  try {
    const { filterStatus } = ctx.request.body;
    // All statuses
    let users = await UserModel.find({}).populate({
      path: 'periods', populate: { path: "projects" }
    });
    switch (filterStatus) {
      case 0:
        return ctx.body = users
      case 1:
        // Approved statuses
        const allUsersApp = await UserModel.find({});
        const periodsApp = await PeriodModel.find({ status: "Approved" }).populate("projects");
        users = allUsersApp.map((user, index, arrSelf) => {
          user.periods = periodsApp.filter(period => period.user == user.id)
          if (user.periods.length > 0) return user;
          return null;
        }).filter(user => user !== null);

        return ctx.body = users;
      case 2:
        // Not approved statuses
        const allUsersNotApp = await UserModel.find({});
        const periodsNotApp = await PeriodModel.find({ status: { $ne: "Approved" } }).populate("projects");
        users = allUsersNotApp.map((user, index, arrSelf) => {
          user.periods = periodsNotApp.filter(period => period.user == user.id)
          if (user.periods.length > 0) return user;
          return null;
        }).filter(user => user !== null);

        return ctx.body = users;
        return ctx.body = users
      default:
        return ctx.body = users
    }
  } catch (error) {
    console.error(error);
  }
};
