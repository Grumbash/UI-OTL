const Koa = require('koa');
const mongoose = require('mongoose');
const Pug = require('koa-pug');
const routes = require("./routes")

mongoose
  .connect('mongodb://localhost/otl', { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(e => console.log(e));

const app = new Koa();
new Pug({
  viewPath: './src/views',
  app
});

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