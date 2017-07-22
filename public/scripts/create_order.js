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
    const data = {
      name: $('#order').find('input[name="name"]').val(),
      phone: $('#order').find('input[name="phone"]').val(),
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
