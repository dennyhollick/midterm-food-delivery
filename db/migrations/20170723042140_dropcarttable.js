exports.up = function(knex, Promise) {
  return knex.schema.dropTable('cart_items');
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable('cart_items', function (table) {
    table.increments();
    table.string('name');
  });
};
