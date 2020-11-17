const Entry = require('../models/Entry');
const { ensureAuth, ensureGuest } = require('../Middleware/auth');

/**
 * @description Renders our landing page
 */
exports.renderLoginPage = (req, res) => {
  res.render('login', {
    layout: 'login',
  });
};

/**
 * @description Renders our dashboard page
 */
exports.renderDashboardPage = (req, res) => {
  Entry.find({ user: req.user.id })
    .lean()
    .exec()
    .then((entries) => {
      res.render('dashboard', {
        name: req.user.firstName,
        entries,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render('error/500');
    });
};
