exports.seed = function(knex, Promise) {
  return knex('menu_items').del()
    .then(function () {
      return Promise.all([
       knex('menu_items').insert({name: 'Fish Taco', picture: 'http://www.seriouseats.com/recipes/assets_c/2013/07/20130717-fish-tacos-1-thumb-625xauto-340550.jpg', description: 'breaded shrimp and halibut, home made corn tortillas, guacamole, love, White Stilton Gold cheese', price: 14}),
      ]);
    });
};
