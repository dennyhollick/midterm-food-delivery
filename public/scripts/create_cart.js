$(() => {
  function createItemElements(items) {
    let html = '';
    const cartItems = JSON.parse(window.localStorage.getItem('cart'));
    if (cartItems) {
      for (const cartItemKey of Object.keys(cartItems)) {
        for (let itemKey = 0; itemKey < items.length; itemKey += 1) {
          if (cartItemKey === items[itemKey].name) {
            const index = itemKey;

            const itemElement = `
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
      html = `
      <br>
      <br>
      <p class="text-right">Your cart is empty.</p>
      <br>
      `;
      return html;
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
