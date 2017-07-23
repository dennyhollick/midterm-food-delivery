$(() => {
  $('#clearcart').on('click', () => {
    window.localStorage.clear('cart');
    location.reload();
    console.log('welldone')

  });
});
