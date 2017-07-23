exports.seed = function(knex, Promise) {
  return knex('menu_items').del()
    .then(function () {
      return Promise.all([
       knex('menu_items').insert({name: 'Fish Taco', picture: 'http://www.seriouseats.com/recipes/assets_c/2013/07/20130717-fish-tacos-1-thumb-625xauto-340550.jpg', description: 'breaded shrimp and halibut, home made corn tortillas, guacamole, love, White Stilton Gold cheese', price: 14}),
       knex('menu_items').insert({name: 'Fiesta Chicken Enchiladas', picture: 'https://shelikestoeat.files.wordpress.com/2012/01/3796088529_2b71f9138b1.jpeg', description: 'free range chicken, alaskan produced chile, home made corn tortillas, tex-mex cheese', price: 22}),
       knex('menu_items').insert({name: 'Cowboy Nachos', picture: 'https://a.dilcdn.com/bl/wp-content/uploads/sites/8/2015/08/2015-07-Cowboy-Nachos-14-1-of-1.jpg', description: 'pinto beans, slow roasted beef brisket, melted cheese, oven baked tortillas', price: 17}),
       knex('menu_items').insert({name: 'Picadillo Quesadillas', picture: 'http://www.skinnytaste.com/wp-content/uploads/2014/05/mexicuban-picadillo-quesadillas-550x367.jpg', description: 'ground beef and pork, brandywine tomatoes, home made mozzarella cheese', price: 13}),
       knex('menu_items').insert({name: 'El Pastor', picture: 'http://eltaquitomexicanrestaurant.com/images/tacos-al-pastor-cebolla-tortilla.jpg?crc=4090518741', description: 'Some of the best pork tacos in town. Slow roasted in an savory sauce.', price: 14}),
       knex('menu_items').insert({name: 'Salsa and Chips', picture: 'http://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/12/9/0/FNK_Salsa-and-Chips_s4x3.jpg.rend.hgtvcom.616.462.suffix/1487125997073.jpeg', description: 'We have the best salsa in town! Try it with our homemade chips!', price: 8}),
       knex('menu_items').insert({name: 'Vegan Burrito', picture: 'https://fthmb.tqn.com/BbDtm0mRPZbhMBer8jwZ5CBanLU=/960x0/filters:no_upscale()/about/1-bean-burrito-56a9bee83df78cf772aa2994.jpg', description: 'A vegan burrito made with avacado, tofu, and plenty of veg. Served in a warm whole-grain tortilla', price: 14}),
       knex('menu_items').insert({name: 'Horchata', picture: 'http://noshonit.s3.amazonaws.com/wp-content/uploads/Horizontal.jpg', description: 'Try this amazing drink made of ground almonds, sesame seeds, rice, barley, tigernuts, and melon seeds.', price: 3}),
       knex('menu_items').insert({name: 'Mexican Coke', picture: 'https://cdn.shopify.com/s/files/1/0862/8416/products/Mexican-Coca-Cola.jpg?v=1465322372', description: 'Coke made in Mexico! Mexican coke uses real cane surgar instead of syrup. Well worth it', price: 3}),
      ]);
    });
};
