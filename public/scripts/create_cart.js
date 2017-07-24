$(() => {

  function createItemElements(items) {
    const cartItems = JSON.parse(window.localStorage.getItem('cart'));
    if (cartItems) {
      var html = '';
      for (var cartItemKey of Object.keys(cartItems)) {
        for (var itemKey = 0; itemKey < items.length; itemKey++) {
          if (cartItemKey == items[itemKey].name) {
            let index = itemKey;

            var itemElement = `
            <tr>
              <td class="item">${items[index].name}</td>
              <td class="text-right">${cartItems[cartItemKey].amount}</td>
              <td class="text-right">$${items[index].price}</td>
            </tr>
        `;
            html += itemElement;
          }
        }
      }
    } else {
      var html = `
      <br>
      <br>
      <p class="text-right">Your cart is empty.</p>
      <br>
      `;
    }
    return html;
  }

  $.ajax({
    method: 'GET',
    url: '/api/menu_items',
  }).done((items) => {
    $('.cart-items > tbody').append(createItemElements(items));
    if (!($('.item').length)) {
      $('.input-table').css('display', 'none');
    }
  });
});
