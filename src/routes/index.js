const Router = require('koa-router');
const getMainPage = require('../controllers/getMain');
const getPeriodById = require('../controllers/getPeriodById');
const getUserById = require('../controllers/getUserById');

const router = new Router();

router.get('/', getMainPage);
router.get('/users/:id', getUserById);
router.get('/periods/:id', getPeriodById);

module.exports = { routes: router.routes(), allowedMethods: router.allowedMethods() };