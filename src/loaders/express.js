const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const methodOverride = require('method-override');

/**
 * This module is our express application.
 * Contains express middlewares and route initialization.
 *
 * @param {Object} object
 * @param {express.Application} object.app - our initialized express app
 */
module.exports = ({ app }) => {
  // MIDDLEWARES
  // Helps us by loging our requests to the console
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // Using body-parser to accept form data
  app.use(express.urlencoded({ extended: false }));
  // Using body-parser to format input to json
  app.use(express.json());

  // Method override - Helps us make PUT and DELETE requests from our form
  // Replaces our method='POST' with our hidden input. Either PUT or DELETE.
  app.use(
    methodOverride((req, res) => {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );

  // Using a static folder
  app.use(express.static(path.join(__dirname, '../../public')));

  // Handdlebars Helpers
  const {
    formatDate,
    stripTags,
    truncate,
    editIcon,
    select,
  } = require('../helpers/hbs');

  // Using a templating engine to render files server side
  app.engine(
    '.hbs',
    exphbs({
      helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select,
      },
      defaultLayout: 'main',
      extname: '.hbs',
    })
  );
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', '.hbs');

  // Sessions
  app.use(
    session({
      secret: 'cupcakes',
      resave: false, // Don't wanna save a session if nothing is modified
      saveUninitialized: false, // Don't create a session till something is stored
      store: new MongoStore({ mongooseConnection: mongoose.connection }), // Store our sessions in the db
    })
  );

  // Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Set express global variable to access in our templating engine.
  app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
  });

  // ROUTES
  app.use('/', require('../routes/index'));
  app.use('/auth', require('../routes/auth'));
  app.use('/thoughts', require('../routes/thoughts'));
};
