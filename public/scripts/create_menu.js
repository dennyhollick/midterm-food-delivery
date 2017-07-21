
$(document).ready(() => {
  // Creates a single menu element for a row

  function createItemElement(item) {
    const itemElement =
        `<section class="col-md-6">
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
        </section>`;
    return itemElement;
  }

  // Creates a row of 2 menu items

  function createNewRow(item1, item2) {
    const row =
  `<section class="row" style="padding-top: 2em">
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
  </section>`;
    return row;
  }

  // Logic on how to assemble menu items before rendering

  function createMenuItems(items) {
    let menuItems = '';
    let i = 0;
    while (i < items.length) {
      let item1 = '';
      let item2 = '';
      if (i !== items.length - 1) {
        item1 = createItemElement(items[i]);
        item2 = createItemElement(items[i + 1]);
      } else {
        item1 = createItemElement(items[i]);
        item2 = ' ';
      }
      const newRow = createNewRow(item1, item2);
      menuItems += newRow;
      i += 2;
    }
    return menuItems;
  }


  // This makes the request and assembles the menu
  // TODO: Add a throw err!

  $(() => {
    $.ajax({
      method: 'GET',
      url: '/api/menu_items',
    }).done((items) => {
      $('.menu-items').append(createMenuItems(items));
    });
  });
});
