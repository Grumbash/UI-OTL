const Router = require('koa-router');
const getMainPage = require('../controllers/getMain');

const router = new Router();

router.get('/', getMainPage);

module.exports = { routes: router.routes(), allowedMethods: router.allowedMethods() };
