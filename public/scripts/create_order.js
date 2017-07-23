$(() => {

  function items() {
    const arr = Object.keys(JSON.parse(window.localStorage.getItem('cart')));
    const obj = {};
    for (item of arr) {
      const amount = JSON.parse(window.localStorage.getItem('cart'))[item].amount;
      obj[item] = amount;
    }
    return obj;
  }
  
  $('body').on('submit', '#order', (e) => {
    e.preventDefault();
    if (!($('.cart-input-name').val()) || !($('.cart-input-phone').val())) {
      alert('Invalid Name or Number. \n Please try again.');
      return;
    }
    const data = {
      name: $('.cart-input-name').val(),
      phone: $('.cart-input-phone').val(),
      cart: items(),
    };
    console.log(data);
    $.post({
      url: '/cart/place_order',
      data: {data: JSON.stringify(data)},
    })
      .done((data) => {
      });
  });
});
