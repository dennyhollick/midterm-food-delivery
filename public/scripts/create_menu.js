
$(document).ready(() => {


  function createItemElement(item) {
    const itemElement =
        `<div class="col-md-6">
          <div class="row">
            <div class="col-md-3">
              <img alt="${item.name}" src="${item.picture}" class="img-rounded img-responsive" />
            </div>
            <div class="col-md-6">
              <h4 style="margin-top: 0px;">
                ${item.name}
              </h4>
              <p>
                ${item.description}
              </p>
            </div>
            <div class="col-md-3">
            <h4 style="margin-top: 0px;">$${item.price}</h4>
              <div class="input-group">
                <span class="input-group-btn">
                  <button class="add-item btn btn-success" data-id="${item.id}" type="button">Add</button>
                </span>
                <input type="text" class="form-control" placeholder="1" value="1">
              </div>
            </div>
          </div>
        </div>`;
    return itemElement;
  }


  function createNewRow(item1, item2) {
    const row =
  `<div class="row" style="padding-top: 2em">
    <div class="col-md-1">
    </div>
    <div class="col-md-10">
      <div class="row">
        ${item1}
        ${item2}
      </div>
    </div>
    <div class="col-md-1">
    </div>
  </div>`;
    return row;
  }


  function createMenuItems(items) {
    let menuItems = '';
    let i = 0;
    while (i < items.length) {
      let item1 = '';
      let item2 = '';
      console.log(`Lenght: ${  items.length}`);
      console.log(`Doing number${  i  } and next`);
      if (i !== items.length - 1) {
        console.log('i think there is 2 numbers');
        item1 = createItemElement(items[i]);
        item2 = createItemElement(items[i + 1]);
      } else {
        console.log('i think there is 1 number left');
        item1 = createItemElement(items[i]);
        item2 = ' ';
      }
      const newRow = createNewRow(item1, item2);
      menuItems += newRow;
      i += 2;
      console.log(`setting i to: ${  i}`);
    }
    return menuItems;
  }


  // This makes the request and assembles the menu

  $(() => {
    $.ajax({
      method: 'GET',
      url: '/api/menu_items',
    }).done((items) => {
      console.log(items);
      $('.menu-items').append(createMenuItems(items));
    });
  });
});
