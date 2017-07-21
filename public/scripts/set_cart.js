$(() => {
  const currentCart = JSON.parse(window.localStorage.getItem('cart'));

  const cart = currentCart || {};

  const helpers = {

    addItems: (id, amount) => {

      cart[id] = {
        amount: amount
      }

      helpers.setCart(cart);

    },

    deleteItem: (id) => {

      delete cart[id]

      helpers.setCart(cart);
    },

    setCart: function (cart) {
      window.localStorage.setItem('cart', JSON.stringify(cart));
    }
  };

  $('body').on('click', '.add-item', function () {
    let id = $(this).data('id');
    let count = $(this).parents().next().val();
    helpers.addItems(id, count);
    console.log(currentCart);
  });
})
