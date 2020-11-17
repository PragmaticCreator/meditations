/**
 * This module protects our routes.
 * Prevents users from accessing unnecessary pages.
 */
module.exports = {
  // Prevents users not logged in from accessing the dashboard.
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/');
    }
  },
  // Prevent logged in users from accessing the login page without logging out.
  ensureGuest: (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard');
    } else {
      next();
    }
  },
};
