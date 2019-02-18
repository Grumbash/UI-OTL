const UserModel = require("../models/User");
const moment = require("moment");

module.exports = async ctx => {
  try {
    const { id } = ctx.params;
    const [[period]] = await UserModel
      .find({})
      .then(
        users => users
          .map(
            user => user.periods
              .filter(
                period => {
                  console.log(period)
                  return period.id === id
                }
              )
          )
      )
      .catch(e => console.log(e));
    ctx.render(
      "fullInfo",
      {
        period:
        {
          ...period.toObject(),
          to: moment(period.to).format("MM/DD/YY"),
          from: moment(period.from).format("MM/DD/YY")
        }
      }
    );
  } catch (error) {
    console.log(error)
  }
}