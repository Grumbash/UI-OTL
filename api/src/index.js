require('dotenv').config();

const Koa = require('koa');
const mongoose = require('mongoose');
const logger = require('koa-logger');
const routes = require('./routes');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

mongoose.set('debug', true);
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(e => console.log(e));

const app = new Koa();

app.use(logger());
app.use(cors());
app.use(bodyParser());

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
