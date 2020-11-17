const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/User');

/**
 *
 * This module helps us log into google and stores user data to the database.
 *
 * @param {passport.Authenticator} passport
 */
module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        // Verifying existing user before storing to database.
        User.findOne({ googleId: profile.id })
          .exec()
          .then((existingUser) => {
            if (existingUser) {
              done(null, existingUser);
            } else {
              done(null, User.create(newUser));
            }
          })
          .catch((err) => console.log(err));
      }
    )
  );

  /**
   * Each subsequent request will contain a unique cookie that identifies the session.
   * Inorder to support the login session,
   * passport will serialize and deserialize user instances to and from the session.
   */
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
