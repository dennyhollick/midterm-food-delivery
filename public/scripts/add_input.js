$(() => {
  function addInput() {
    const cartItems = JSON.parse(window.localStorage.getItem('cart'));
    if (cartItems) {
      const html = `
        <table class="row pull-left input-table">
          <form action="/cart/place_order" id="order" method="POST">
            <tr class="cart-input-row">
              <th>Name: </th>
              <th><input class="cart-input cart-input-name" name="name" placeholder="Name" type="text"></th>
              <th class="cart-btn-row pull-right"><button type="button" class="btn btn-danger cart-btn pull-right">Clear Cart</button></th>
            </tr>
            <tr class="cart-input-row">
              <th>Phone Number: </th>
              <th><input class="cart-input cart-input-phone" name="phone" placeholder="Phone Number" type="text"></th>
              <th class="cart-btn-row pull-right"><button type="submit" class="checkout-btn btn btn-success pull-right">Checkout</button></th>
            </tr> 
          </form>
        </table>
      `;
      return html;
    }
  }

  $('.price').before(addInput());
});
