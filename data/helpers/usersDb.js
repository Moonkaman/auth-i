const db = require('../dbConfig');

module.exports = {
  get,
  insert,
  findBy
}

function get() {
  return db('users');
}

function getById(id) {
  return db('users').where({id: id})
}

function insert(user) {
  return db('users').insert(user)
    .then(id => {
      return getById(id[0]);
    })
}

function findBy(username) {
  return db('users').where(username).first();
}