$(() => {
  $('.cart-btn').on('click', () => {
    window.localStorage.clear('cart');
    location.reload();

  });
});
