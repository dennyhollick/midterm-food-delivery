exports.up = function (knex, Promise) {
	return Promise.all([
		knex.schema.createTable('menu_items', function (table) {
			table.increments();
			table.string('name');
			table.string('picture');
			table.string('description');
			table.integer('price');
		})
	])
};

exports.down = function (knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('menu_items')
	])
};
