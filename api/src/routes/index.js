const Router = require ('koa-router');
const passport = require ('koa-passport');

const rootRoute = require ('../controllers/root');
const {
  getUserById,
  getAllUsers,
  postFiltredUsers,
  getUserScreenByUserId,
} = require ('../controllers/users');
const {
  getAllUnicPeriods,
  getPeriodById,
  getPeriodScreenByPeriodId,
} = require ('../controllers/periods');
const {
  getAllProjectsByPeriodId,
  getAllUnicProjects,
  postToUnicProjects,
  getProjectByPO,
} = require ('../controllers/projects');
const {getCreds, postCreds, deleteCredsById} = require ('../controllers/creds');
const {authLogin} = require ('../controllers/auth');
const {postUserForm} = require ('../controllers/userForm');
const {postPlannedHours} = require ('../controllers/plannedHours');

const router = new Router ();

router.get ('/', passport.authenticate ('jwt', {session: false}), rootRoute);
router.get (
  '/users',
  passport.authenticate ('jwt', {session: false}),
  getAllUsers
);
router.post (
  '/users',
  passport.authenticate ('jwt', {session: false}),
  postFiltredUsers
);
router.get (
  '/users/:id',
  passport.authenticate ('jwt', {session: false}),
  getUserById
);
router.get (
  '/users/:id/screenshot',
  passport.authenticate ('jwt', {session: false}),
  getUserScreenByUserId
);

router.get (
  '/periods',
  passport.authenticate ('jwt', {session: false}),
  getAllUnicPeriods
);
router.get (
  '/periods/:id',
  passport.authenticate ('jwt', {session: false}),
  getPeriodById
);
router.get (
  '/periods/:periodId/projects',
  passport.authenticate ('jwt', {session: false}),
  getAllProjectsByPeriodId
);
router.get (
  '/periods/:periodId/screenshot',
  passport.authenticate ('jwt', {session: false}),
  getPeriodScreenByPeriodId
);

router.get (
  '/projects',
  passport.authenticate ('jwt', {session: false}),
  getAllUnicProjects
);
router.post (
  '/projects',
  passport.authenticate ('jwt', {session: false}),
  postToUnicProjects
);
router.get (
  '/projects/:PO',
  passport.authenticate ('jwt', {session: false}),
  getProjectByPO
);
router.post (
  '/projects/planned-hours',
  passport.authenticate ('jwt', {session: false}),
  postPlannedHours
);

router.get (
  '/creds',
  passport.authenticate ('jwt', {session: false}),
  getCreds
);
router.post (
  '/creds',
  passport.authenticate ('jwt', {session: false}),
  postCreds
);
router.delete (
  '/creds/:id',
  passport.authenticate ('jwt', {session: false}),
  deleteCredsById
);

router.post ('/auth/login', authLogin);

router.post (
  '/user-form',
  passport.authenticate ('jwt', {session: false}),
  postUserForm
);

module.exports = {
  routes: router.routes (),
  allowedMethods: router.allowedMethods (),
};
