$(() => {
  $('.cart-btn').addClass('.return').on('click', (e) => {
    localStorage.clear('cart');
    if ($(this).hasClass('.cart-btn')) {
    location.reload();
    }
  });
});
