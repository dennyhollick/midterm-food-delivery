exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.table('orders', function (table) {
            table.text('cart').alter();
        }),
    ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', function (table) {
      table.string('cart').alter();
    }),
  ]);
};
