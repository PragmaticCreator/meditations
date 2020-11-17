const passport = require('passport');
const router = require('express').Router();
/**
 * @description Auth with Google
 * @route GET /auth.google
 */
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

/**
 * @description Google auth callback
 * @route GEt /auth/google/callback
 */
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

/**
 * @description Logout user
 * @route /auth/logout
 */
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
