const db = require('../dbConfig');

module.exports = {
  get,
  insert,
  findBy
}

function get() {
  return db('users');
}

function insert(user) {
  return db('users').insert(user);
}

function findBy(username) {
  return db('users').where(username).first();
}