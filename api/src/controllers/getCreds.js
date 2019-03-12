const CredsModel = require('../models/Creds');

module.exports = async ctx => {
  try {
    const creds = await CredsModel.find({})
    const credsToreturt = creds.map(cred => ({ login: cred.sso.login, _id: cred.id }))
    ctx.body = credsToreturt;
  } catch (error) {
    console.log(error);
  }
};
