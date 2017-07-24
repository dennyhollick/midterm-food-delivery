$(() => {
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
    if (isNaN(Number($('.cart-input-phone').val()))) {
      swal('Invalid Phone Number.', 'Please try again.', 'error');
      return;
    }
    if (!($('.cart-input-name').val()) || !($('.cart-input-phone').val())) {
      swal('Invalid Name or Number.', 'Please try again.', 'error');
      return;
    }
    window.location.replace('/order');
    const data = {
      name: $('.cart-input-name').val(),
      phone: $('.cart-input-phone').val(),
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
