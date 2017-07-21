exports.up = function (knex, Promise) {
	return Promise.all([
		knex.schema.createTable('cart_items', function (table) {
			table.integer('menu_item_id');
			table.foreign('menu_item_id').references('menu_items.id');
			table.integer('order_id');
			table.foreign('order_id').references('orders.id');
			table.integer('quantity');
		})
	])
};

exports.down = function (knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('cart_items')
	])
};
