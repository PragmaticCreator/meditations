const expressLoader = require('./express');
const mongoLoader = require('./mongoose');
const express = require('express');

/**
 *
 * This module loads all other modules in this folder
 *
 * @param {Object} object
 * @param {express.Application} object.expressApp - our initialized express application
 */
module.exports = ({ expressApp }) => {
  mongoLoader();
  console.log('Database connected and loaded');

  expressLoader({ app: expressApp });
  console.log('Express loaded');
};
