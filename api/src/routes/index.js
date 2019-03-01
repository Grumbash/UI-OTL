const Router = require('koa-router');
const getAllUsers = require('../controllers/getAllUsers');
const getAllPeriods = require('../controllers/getAllPeriods');
const getPeriodById = require('../controllers/getPeriodById');
const getProjectByPO = require('../controllers/getProjectByPO');

const router = new Router();

router.get('/', getAllUsers);
router.get('/periods', getAllPeriods);
router.get('/periods/:id', getPeriodById);
router.get('/projects/:PO', getProjectByPO);



module.exports = { routes: router.routes(), allowedMethods: router.allowedMethods() };
