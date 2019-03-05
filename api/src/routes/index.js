const Router = require('koa-router');
const getAllUsers = require('../controllers/getAllUsers');
const getAllUnicPeriods = require('../controllers/getAllUnicPeriods');
const getAllUnicProjects = require('../controllers/getAllUnicProjects');
const getPeriodById = require('../controllers/getPeriodById');
const getProjectByPO = require('../controllers/getProjectByPO');
const postCreds = require('../controllers/postCreds');
const getAllProjectsByPeriodId = require("../controllers/getAllProjectsByPeriodId")


const router = new Router();

router.get('/', getAllUsers);
router.get('/periods', getAllUnicPeriods);
router.get('/periods/:id', getPeriodById);
router.get('/periods/:periodId/projects', getAllProjectsByPeriodId);
router.get('/projects', getAllUnicProjects);
router.get('/projects/:PO', getProjectByPO);
router.post('/creds', postCreds);



module.exports = { routes: router.routes(), allowedMethods: router.allowedMethods() };
