exports.seed = function(knex, Promise) {
  return knex('menu_items').del()
    .then(function () {
      return Promise.all([
       knex('menu_items').insert({name: 'Fish Taco', picture: 'http://www.seriouseats.com/recipes/assets_c/2013/07/20130717-fish-tacos-1-thumb-625xauto-340550.jpg', description: 'breaded shrimp and halibut, home made corn tortillas, guacamole, love, White Stilton Gold cheese', price: 14}),
       knex('menu_items').insert({name: 'Fiesta Chicken Enchiladas', picture: 'https://shelikestoeat.files.wordpress.com/2012/01/3796088529_2b71f9138b1.jpeg', description: 'free range chicken, alaskan produced chile, home made corn tortillas, tex-mex cheese', price: 22}),
       knex('menu_items').insert({name: 'Cowboy Nachos', picture: 'https://a.dilcdn.com/bl/wp-content/uploads/sites/8/2015/08/2015-07-Cowboy-Nachos-14-1-of-1.jpg', description: 'pinto beans, slow roasted beef brisket, melted cheese, oven baked tortillas', price: 17}),
       knex('menu_items').insert({name: 'Picadillo Quesadillas', picture: 'http://www.skinnytaste.com/wp-content/uploads/2014/05/mexicuban-picadillo-quesadillas-550x367.jpg', description: 'ground beef and pork, brandywine tomatoes, home made mozzarella cheese', price: 13}),
      ]);
    });
};
