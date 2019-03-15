require('dotenv').config();

const Koa = require('koa');
const mongoose = require('mongoose');
const logger = require('koa-logger');
const routes = require('./routes');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const passport = require('koa-passport');

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(e => console.log(e));
mongoose.set({ debugger: true })
const app = new Koa();

app.use(passport.initialize());
require("./utils/passport")(passport);

app.use(logger());
app.use(cors());
app.use(bodyParser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message
    };
    console.log(err);
  }
});

app.use(routes.routes);
app.use(routes.allowedMethods);
app.listen(3000);
