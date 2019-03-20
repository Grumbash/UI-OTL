const Router = require('koa-router');
const passport = require('koa-passport');
const getAllUsers = require('../controllers/getAllUsers');
const postFiltredUsers = require('../controllers/postFiltredUsers');
const getUserById = require('../controllers/getUserById');
const getAllUnicPeriods = require('../controllers/getAllUnicPeriods');
const getAllUnicProjects = require('../controllers/getAllUnicProjects');
const postToUnicProjects = require('../controllers/postToUnicProjects');
const getPeriodById = require('../controllers/getPeriodById');
const getProjectByPO = require('../controllers/getProjectByPO');
const postCreds = require('../controllers/postCreds');
const getCreds = require('../controllers/getCreds');
const deleteCredsById = require('../controllers/deleteCredsById');
const getAllProjectsByPeriodId = require("../controllers/getAllProjectsByPeriodId")
const authLogin = require("../controllers/authLogin")
const postUserForm = require("../controllers/postUserForm")


const router = new Router();

router.get('/', passport.authenticate("jwt", { session: false }), async (ctx) => {
    try {
        ctx.status = 200;
    } catch (error) {
        console.log(error);
    }
});
router.get('/users', passport.authenticate("jwt", { session: false }), getAllUsers);
router.post('/users', passport.authenticate("jwt", { session: false }), postFiltredUsers);
router.get('/users/:id', passport.authenticate("jwt", { session: false }), getUserById);
router.get('/periods', passport.authenticate("jwt", { session: false }), getAllUnicPeriods);
router.get('/periods/:id', passport.authenticate("jwt", { session: false }), getPeriodById);
router.get('/periods/:periodId/projects', passport.authenticate("jwt", { session: false }), getAllProjectsByPeriodId);
router.get('/projects', passport.authenticate("jwt", { session: false }), getAllUnicProjects);
router.post('/projects', passport.authenticate("jwt", { session: false }), postToUnicProjects);
router.get('/projects/:PO', passport.authenticate("jwt", { session: false }), getProjectByPO);
router.get('/creds', passport.authenticate("jwt", { session: false }), getCreds);
router.post('/creds', passport.authenticate("jwt", { session: false }), postCreds);
router.delete('/creds/:id', passport.authenticate("jwt", { session: false }), deleteCredsById);
router.post('/auth/login', authLogin);
router.post('/user-form', passport.authenticate("jwt", { session: false }), postUserForm);



module.exports = { routes: router.routes(), allowedMethods: router.allowedMethods() };
