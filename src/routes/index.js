const router = require('express').Router();
const IndexController = require('../controllers/index');

const { ensureAuth, ensureGuest } = require('../Middleware/auth');

/**
 * @route GET/
 */
router.get('/', ensureGuest, IndexController.renderLoginPage);

/**
 * @route GET/dashboard
 */
router.get('/dashboard', ensureAuth, IndexController.renderDashboardPage);

module.exports = router;
