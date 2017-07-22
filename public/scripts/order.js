$(() => {

  function items() {
    const arr = Object.keys(JSON.parse(window.localStorage.getItem('cart')));
    let obj = {};
    for (item of arr) {
      let amount = JSON.parse(window.localStorage.getItem('cart'))[item].amount;
      obj[item] = amount;
    }
    return obj;
  }

  items();
  $('body').on('click', '#test', function () {
    $.post({
      url: "/cart/place_order",
    })
    console.log(items())
    //   .done(() => {
    //   });

  });
});
