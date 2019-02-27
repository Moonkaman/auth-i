
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t) {
    t.increments();
    t.string('name', 128).notNullable();
    t.string('password').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
