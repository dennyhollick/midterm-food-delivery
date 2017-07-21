exports.up = function (knex, Promise) {
	return Promise.all([
		knex.schema.createTable('orders', function (table) {
			table.increments();
			table.string('name');
			table.integer('phone');
			table.integer('user_id');
		})
	])
};

exports.down = function (knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('orders')
	])
};
