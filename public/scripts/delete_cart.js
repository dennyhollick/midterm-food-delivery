$(() => {
  $('.btn-danger').on('click', () => {
    window.localStorage.clear('cart');
    location.reload();

  });
});
