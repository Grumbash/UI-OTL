const PeriodModel = require ('../models/Period');
const ProjectModel = require ('../models/Project');
const UserModel = require ('../models/User');
const mongoose = require ('mongoose');

exports.getUserById = async ctx => {
  try {
    const {id} = ctx.params;
    const user = await UserModel.findById (id).populate ({
      path: 'periods',
      populate: {
        path: 'projects',
      },
    });
    ctx.body = user;
  } catch (error) {
    console.log (error);
  }
};

exports.getAllUsers = async ctx => {
  try {
    const users = await UserModel.find ({}).populate ({
      path: 'periods',
      populate: {path: 'projects'},
    });
    const retUser = users.map (({_doc}) => {
      const userNew = {..._doc};
      delete userNew.screenshot;
      userNew.periods = userNew.periods.map (({_doc}) => {
        const periodNew = {..._doc};
        delete periodNew.screenshot;
        return periodNew;
      });
      return userNew;
    });
    ctx.body = retUser;
  } catch (error) {
    console.error (error);
  }
};

exports.postFiltredUsers = async ctx => {
  try {
    const {filterStatus} = ctx.request.body;
    // All statuses
    let users = await UserModel.find ({}).populate ({
      path: 'periods',
      populate: {path: 'projects'},
    });
    switch (filterStatus) {
      case 0:
        return (ctx.body = users);
      case 1:
        // Approved statuses
        const allUsersApp = await UserModel.find ({});
        const periodsApp = await PeriodModel.find ({
          status: 'Approved',
        }).populate ('projects');
        users = allUsersApp
          .map ((user, index, arrSelf) => {
            user.periods = periodsApp.filter (period => period.user == user.id);
            if (user.periods.length > 0) return user;
            return null;
          })
          .filter (user => user !== null);

        return (ctx.body = users);
      case 2:
        // Not approved statuses
        const allUsersNotApp = await UserModel.find ({});
        const periodsNotApp = await PeriodModel.find ({
          status: {$ne: 'Approved'},
        }).populate ('projects');
        users = allUsersNotApp
          .map ((user, index, arrSelf) => {
            user.periods = periodsNotApp.filter (
              period => period.user == user.id
            );
            if (user.periods.length > 0) return user;
            return null;
          })
          .filter (user => user !== null);

        return (ctx.body = users);
      default:
        return (ctx.body = users);
    }
  } catch (error) {
    console.error (error);
  }
};

exports.getUserScreenByUserId = async ctx => {
  try {
    const {id} = ctx.params;
    console.log (id);
    const [screen] = await UserModel.aggregate ([
      {
        $match: {
          _id: mongoose.Types.ObjectId (id),
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
