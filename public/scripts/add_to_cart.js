$(() => {
  const currentCart = JSON.parse(window.localStorage.getItem('cart'));

  const cart = currentCart || {};

  const helpers = {

    addItems: (name, amount) => {

      cart[name] = {
        amount,
      }

      helpers.addToCart(cart);

    },

    deleteItem: (id) => {

      delete cart[id]

      helpers.addToCart(cart);
    },

    addToCart: function (cart) {
      window.localStorage.setItem('cart', JSON.stringify(cart));
    }
  };

  $('body').on('click', '.add-item', function () {
    let name = $(this).data('name');
    let count = $(this).parent().next().val();
    helpers.addItems(name, count);
    console.log(currentCart);
  });
})
