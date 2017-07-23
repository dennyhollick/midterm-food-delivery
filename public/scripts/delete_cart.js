$(() => {
  $('.cart-btn').on('click', () => {
    window.localStorage.clear('cart');
    location.reload();
  });
  $('.return').on('click', () => {
    window.localStorage.clear('cart');
  });
});
