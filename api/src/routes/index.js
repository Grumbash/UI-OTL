const Router = require('koa-router');
const passport = require('koa-passport');
const getAllUsers = require('../controllers/getAllUsers');
const postFiltredUsers = require('../controllers/postFiltredUsers');
const getUserById = require('../controllers/getUserById');
const getAllUnicPeriods = require('../controllers/getAllUnicPeriods');
const getAllUnicProjects = require('../controllers/getAllUnicProjects');
const getPeriodById = require('../controllers/getPeriodById');
const getProjectByPO = require('../controllers/getProjectByPO');
const postCreds = require('../controllers/postCreds');
const getCreds = require('../controllers/getCreds');
const deleteCredsById = require('../controllers/deleteCredsById');
const getAllProjectsByPeriodId = require("../controllers/getAllProjectsByPeriodId")
const authLogin = require("../controllers/authLogin")


const router = new Router();

router.get('/', getAllUsers);
router.post('/', postFiltredUsers);
router.get('/users/:id', getUserById);
router.get('/periods', getAllUnicPeriods);
router.get('/periods/:id', getPeriodById);
router.get('/periods/:periodId/projects', getAllProjectsByPeriodId);
router.get('/projects', getAllUnicProjects);
router.get('/projects/:PO', getProjectByPO);
router.get('/creds', getCreds);
router.post('/creds', postCreds);
router.delete('/creds/:id', deleteCredsById);
router.post('/auth/login', authLogin);



module.exports = { routes: router.routes(), allowedMethods: router.allowedMethods() };
