
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
    t.dropColumn('name');
    t.string('username');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
    t.dropColumn('username');
    t.string('name');
  })
};
