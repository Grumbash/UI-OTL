const Router = require("koa-router");
const getMainPage = require('../controllers/getMain');
const getPeriodById = require('../controllers/getPeriodById');

const router = new Router();

router.get("/", getMainPage);
router.get("/:id", getPeriodById);

module.exports = { routes: router.routes(), allowedMethods: router.allowedMethods() };