$(() => {
  // Object containing localstorage data from the users cart
  const currentCart = JSON.parse(window.localStorage.getItem('cart'));

  // If currentCart exists use it, otherwise default
  const cart = currentCart || {};

  // Helper function to add item and delete item
  const helpers = {

    addItems: (name, amount) => {
      cart[name] = {
        amount,
      };

      helpers.addToCart(cart);
    },

    // Function was never used, feature was not implemented

    deleteItem: (id) => {
      delete cart[id];

      helpers.addToCart(cart);
    },

    addToCart(cart) {
      window.localStorage.setItem('cart', JSON.stringify(cart));
    },
  };

  // jQuery event-handler to add item to localstorage

  $('body').on('click', '.add-item', function () {
    swal('Item Added!', 'You can add more or go to your cart!', 'success');
    const name = $(this).data('name');
    const count = $(this).parent().next().val();
    helpers.addItems(name, count);
  });
});

