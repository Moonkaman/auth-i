const knex = require('knex');

knexConfig = require('../knexfile');

module.exports = knex(knexConfig.development);