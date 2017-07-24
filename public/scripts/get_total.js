$(() => {
  const cartItems = JSON.parse(window.localStorage.getItem('cart'));

  function getSubTotal(items) {
    if (cartItems) {
      let subTotal = 0.00;
      for (var cartItemKey of Object.keys(cartItems)) {
        for (var itemKey = 0; itemKey < items.length; itemKey++) {
          if (cartItemKey == items[itemKey].name) {
            let index = itemKey;
            subTotal += items[index].price * cartItems[cartItemKey].amount;
          }
        }
      }
      return subTotal;
    }
  }

  function createPriceElement(items) {
    if (cartItems) {
      const html = `
        <tr id="subtotal">
          <td>Subtotal</td>
          <td class="text-right">$${(getSubTotal(items)).toFixed(2)}</td>
        </tr>
        <tr id="tax">
          <td>Tax</td>
          <td class="text-right">$${(getSubTotal(items) * 0.05).toFixed(2)}</td>
        </tr>
        <tr id="total">
          <th>Total:</th>
          <td class="text-right">$${(getSubTotal(items) * 1.05).toFixed(2)}</td>
        </tr>
      `;
      return html;
    }
  }
  $.ajax({
    method: 'GET',
    url: '/api/menu_items',
  }).done((items) => {
    $('.price > tbody').append(createPriceElement(items));
  });
});
