$(() => {
  const cartItems = JSON.parse(window.localStorage.getItem('cart'));

  function createItemElements(items) {
    if (cartItems) {
      var html = '';
      for (var cartItemKey of Object.keys(cartItems)) {
        for (var itemKey = 0; itemKey < items.length; itemKey++) {
          if (cartItemKey == items[itemKey].name) {
            let index = itemKey;

            var itemElement = `
            <tr>
              <td>${items[index].name}</td>
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
      <p class="text-right">Your cart is empty.</p>
      `;
    }
    return html;
  }

  function addButtons(items) {
    if (cartItems) {
      var buttonHTML = '';
      for (var cartItemKey of Object.keys(cartItems)) {
        for (var itemKey = 0; itemKey < items.length; itemKey++) {
          if (cartItemKey == items[itemKey].name) {
            var buttonElement = `              
            <div class="row pull-left">
                <button type="button" id="clearcart" class="btn btn-danger cart-btn pull-right">Clear Cart</button>
                <br>
                <br>
                <form action="/cart/place_order" id="order" method="POST">  
                  <button type="submit" class="btn btn-success cart-btn pull-right">Checkout</button>
                  <input name="name" placeholder="Name" type="text">
                  <br>
                  <input name="phone" placeholder="Phone Number" type="text">
                </form>
              </div> 
            `
            buttonHTML += buttonElement;
            console.log("hello")
            return buttonHTML;
          }
        }
      }
    }
    else {
      console.log('nothing')
    }
  }


  $.ajax({
    method: 'GET',
    url: '/api/menu_items',
  }).done((items) => {
    $('.cart-items > tbody').append(createItemElements(items));
    $('#buttondiv').append(addButtons(items))
  });
});
