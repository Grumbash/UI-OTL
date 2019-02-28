const Router = require('koa-router');
const getAllUsers = require('../controllers/getAllUsers');
const getPeriodById = require('../controllers/getPeriodById');

const router = new Router();

router.get('/', getAllUsers);
router.get('/periods/:id', getPeriodById);


module.exports = { routes: router.routes(), allowedMethods: router.allowedMethods() };
