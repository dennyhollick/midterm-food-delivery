exports.up = function (knex, Promise) {
	return Promise.all([
		knex.schema.createTable('cart_items', function (table) {
			table.integer('item_id');
			table.foreign('item_id').references('menu_items.id');
			table.integer('order_id');
			table.foreign('order_id').references('order.id');
			table.integer('quantity');
		})
	])
};

exports.down = function (knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('cart_items')
	])
};
