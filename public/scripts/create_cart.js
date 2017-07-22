$(() => {

  function createItemElements(items) {
    const cartItems = JSON.parse(window.localStorage.getItem('cart'));
    var html = '';
    for (var i of Object.keys(cartItems)) {
      for (var x of items) {
        if (i == x.id) {
          const index = Object.keys(cartItems).indexOf(i);
          var itemElement = `
            <tr>
              <td>${items[index].name}</td>
              <td class="text-right">${cartItems[i].amount}</td>
              <td class="text-right">$${items[index].price}</td>
            </tr>
        `;
          html += itemElement;
        }
      }
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
