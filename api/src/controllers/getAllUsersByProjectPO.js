const PeriodModel = require('../models/Period');
const ProjectModel = require('../models/Project');
const UserModel = require('../models/User');

module.exports = async ctx => {
  try {
    const { PO } = ctx.params;
    const users = await ProjectModel
      .find({ PO })
      .populate(
        {
          path: 'period',
          populate: {
            path: "user"
          }
        }
      )
      .then(projects => projects.filter((project, index, self) => (
        index === self.findIndex(elem => (
          elem.period.user.name === project.period.user.name
        ))
      )
      )).catch(e => console.log(e));

    ctx.body = users;
  } catch (error) {
    console.log(error);
  }
};
