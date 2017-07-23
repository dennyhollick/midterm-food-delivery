$(() => {
  $('.cart-btn').on('click', () => {
    window.localStorage.clear('cart');
    location.reload();
  });

  $('.checkout-btn').on('click', () => {
    window.location.replace('/order');
  });
});
