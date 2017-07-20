function addMenuItems (data) {
  const menu = `
    <div class="menu_items">
      <p class="name">${data.name}</p>
			<p class="price">${data.price}</p>
			<img class ="food-pic" src="${data.picture}">
      <p class="description">${data.description}</p>
    </div>
    `
return menu
}

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/menu_items"
  }).done((items) => {
    for(item of items) {
      $(".menu-container").prepend(addMenuItems(item))
    }
  });
});