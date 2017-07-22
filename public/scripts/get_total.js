$(() => {

  function getSubTotal(items) {
    const cartItems = JSON.parse(window.localStorage.getItem('cart'));
    let subTotal = 0.00;
    for (var i of Object.keys(cartItems)) {
      for (var x of items) {
        if (i == x.id) {
          let index = Object.keys(cartItems).indexOf(i);
          subTotal += items[index].price * cartItems[i].amount;
        }
      }
    }
    return subTotal;
  }

  function createPriceElement(items) {
    var html = `
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
		`
    return html;
  }

  $.ajax({
    method: 'GET',
    url: '/api/menu_items',
  }).done((items) => {
    $('.price > tbody').append(createPriceElement(items));
  });
});
