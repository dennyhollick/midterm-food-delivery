$(() => {
  // Returns an object containing the name of the item and the amount ordered

  function items() {
    const arr = Object.keys(JSON.parse(window.localStorage.getItem('cart')));
    const obj = {};
    for (const item of arr) {
      const amount = JSON.parse(window.localStorage.getItem('cart'))[item].amount;
      obj[item] = amount;
    }
    return obj;
  }

  $('body').on('submit', '#order', (e) => {
    e.preventDefault();
    const phone = $('.cart-input-phone').val();
    const name = $('.cart-input-name').val();
    // Logic for checking if phone number input is a line of numbers
    if (isNaN(Number(phone)) || phone.length < 7) {
      swal('Invalid Phone Number.', 'Please try again.', 'error');
      return;
    }
    // Logic checking for input
    if (!(name) || !(phone)) {
      swal('Invalid Name or Number.', 'Please try again.', 'error');
      return;
    }
    window.location.replace('/order');
    const data = {
      name,
      phone,
      cart: items(),
    };
    $.post({
      url: '/cart/place_order',
      data: { data: JSON.stringify(data) },
    })
      .done(() => {
      });
  });
});
