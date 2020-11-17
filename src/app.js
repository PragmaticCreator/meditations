const dotenv = require('dotenv');
const express = require('express');
const passport = require('passport');

const main = () => {
  // Loading our environment variables
  dotenv.config({ path: './src/config/config.env' });

  // Passport config
  require('./config/passport')(passport);

  const app = express();
  // Initializing our application
  require('./loaders/index')({ expressApp: app });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} on PORT:${PORT}`);
  });
};

main();
