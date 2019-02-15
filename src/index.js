const Koa = require('koa');
const mongoose = require('mongoose');
const UserModel = require("./models/User");
const Pug = require('koa-pug');

mongoose
  .connect('mongodb://localhost/otl', { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(e => console.log(e));

const app = new Koa();

// response
app.use(async ctx => {
  const users = await UserModel.find({});
  ctx.body = users;
});

app.listen(3000);