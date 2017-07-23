exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', function (table) {
      table.dropColumn('user_id');
      table.string('cart');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', function (table) {
      table.integer('user_id');
      table.dropColumn('cart');
    }),
  ]);
};
