exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', function (table) {
      table.dropColumn('phone');
      table.string('phone');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', function (table) {
      table.integer('phone');
      table.dropColumn('phone');
    }),
  ]);
};