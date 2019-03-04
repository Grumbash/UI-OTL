const Router = require('koa-router');
const getAllUsers = require('../controllers/getAllUsers');
const getAllUnicPeriods = require('../controllers/getAllUnicPeriods');
const getAllUnicProjects = require('../controllers/getAllUnicProjects');
const getPeriodById = require('../controllers/getPeriodById');
const getProjectByPO = require('../controllers/getProjectByPO');
const getAllUsersByProjectPO = require('../controllers/getAllUsersByProjectPO');

const router = new Router();

router.get('/', getAllUsers);
router.get('/periods', getAllUnicPeriods);
router.get('/periods/:id', getPeriodById);
router.get('/projects', getAllUnicProjects);
router.get('/projects/:PO', getProjectByPO);
router.get('/projects/:PO/users', getAllUsersByProjectPO);



module.exports = { routes: router.routes(), allowedMethods: router.allowedMethods() };
