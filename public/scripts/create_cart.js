$(() => {

  function createItemElements(items) {
    const cartItems = JSON.parse(window.localStorage.getItem('cart'));
    var html = '';
    for (var id in cartItems) {
      var itemElement = `
            <tr>
              <td>${items[id - 1].name}</td>
              <td class="text-right">${cartItems[id].amount}</td>
              <td class="text-right">$${items[id - 1].price}</td>
            </tr>
        `;
      html += itemElement;
    }
    return html;
  }

  $.ajax({
    method: 'GET',
    url: '/api/menu_items',
  }).done((items) => {
    $('.cart-items > tbody').append(createItemElements(items));
  });
});
