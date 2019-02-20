const Koa = require('koa');
const mongoose = require('mongoose');
const routes = require("./routes");
const views = require('koa-views');
const serve = require('koa-static');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

mongoose.set("debug", true);
mongoose
  .connect('mongodb://localhost/otl', { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(e => console.log(e));

const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(serve(__dirname + '/public'));
app.use(views(__dirname + '/views', {
  extension: 'pug',
}));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message
    };
    console.log(e);
  }
});

app.use(routes.routes);
app.use(routes.allowedMethods);


app.listen(3000);