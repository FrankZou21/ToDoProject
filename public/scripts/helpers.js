const renderList = function (list) {
  $('.listContainer').empty();
  for (let item of items) {
    let output = createElement(list);
    $(`.listContainer`).prepend(output);
  }
};

const loadList = function (data) {
  $.ajax({ url: '/tweets', method: 'GET' })
    .then(function (res) {
      renderList(res);
    })
};

const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


// Hit "Enter" to submit form

const enterSubmit = function(){
var input = document.getElementById("navbutton");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("navbutton").click();
  }
});

}

// Checkbox confirmation, and space for notes

function doalert(checkboxG1) {
  if (checkboxG1.checked) {
    alert ("hi");
  } else {
    alert ("bye");
  }
}

// CARD TEMPLATES - BY CATEGORY

// RESTAURANTS

const createRestaurantElement = function(restaurant) {
  let timeStart = Date.now();
  let millis = Date.now() - restaurant.created_at;
  let dateStamp = (millis / (60 * 60 * 24 * 1000))
  let totalDate = Math.round(dateStamp);

  const restaurantTemplate = (
    `<article class="itembody">
         <header class="itemheader">
          <input type="checkbox" name="checkboxG1" id="checkboxG1" class="css-checkbox" onchange="confirm(this)"/>
          <label for="checkboxG1" class="css-label">
           <span id="iteminfo"><img src="${restaurant.picture}"> ${restaurant.name}</span>
        </header>
        ${escape(restaurant.content.text)}
        <span class="iteminfo">Type of Food: ${restaurant.type_of_food}</span>
        <span class="iteminfo">Phone Number: ${restaurant.phone_number}</span>
        <span class="iteminfo">Rating: ${restaurant.rating}</span>

        <footer class="itemfooter"><h8>Added to your list ${totalDate} days ago</h8></footer>
      </article>`
  )
  return restaurantTemplate;
}

// BOOKS

const createBookElement = function(book) {
  let timeStart = Date.now();
  let millis = Date.now() - books.created_at;
  let dateStamp = (millis / (60 * 60 * 24 * 1000))
  let totalDate = Math.round(dateStamp);

  const bookTemplate = (
    `<article class="itembody">
         <header class="itemheader">
         <input type="checkbox" name="checkboxG1" id="checkboxG1" class="css-checkbox" onchange="confirm(this)"/>
         <label for="checkboxG1" class="css-label">
          <span id="iteminfo"><img src="${book.user.avatars}"> ${book.user.name} </span>
          <span class="iteminfo">${book.title}</span>
        </header>
        <span class="iteminfo">Author: ${book.author}</span>
        <span class="iteminfo">Length: ${book.page_count} pages</span>
        <span class="iteminfo">Rating: ${book.rating} (via Goodreads)</span>
        ${escape(book.content.text)}
        <footer class="itemfooter"><h8>Added to your list ${totalDate} days ago</h8></footer>
      </article>`
  )
  return bookTemplate;
}

// PRODUCTS


const createProductElement = function (product) {
  let timeStart = Date.now();
  let millis = Date.now() - products.created_at;
  let dateStamp = (millis / (60 * 60 * 24 * 1000))
  let totalDate = Math.round(dateStamp);

  const productTemplate = (
    `<article class="itembody">
         <header class="itemheader">
         <input type="checkbox" name="checkboxG1" id="checkboxG1" class="css-checkbox" onchange="confirm(this)"/>  <label for="checkboxG1" class="css-label"> <span id="usericon"><img src="${product.picture}"> ${product.product_name} </span>
          <span class="iteminfo">Price: ${product.price}</span> </label>
        </header>
        ${escape(product.content.text)} -- LEFT OVER FROM TWEETER, can probably remove this...
        <footer class="itemfooter"><h8> Added to your list ${totalDate} days ago</h8></footer>
      </article>`
  )
  return productTemplate;
}

// MOVIES

const createMovieElement = function (movie) {
  let timeStart = Date.now();
  let millis = Date.now() - movie.created_at;
  let dateStamp = (millis / (60 * 60 * 24 * 1000))
  let totalDate = Math.round(dateStamp);

  const movieTemplate = (
    `<article class="itembody">
         <header class="itemheader">
         <input type="checkbox" name="checkboxG1" id="checkboxG1" class="css-checkbox" onchange="confirm(this)"/>  <label for="checkboxG1" class="css-label">
         <span class="iteminfo">${movie.title}</span></label>
         <br>
         <span class="iteminfo"> <img src="${movie.user.avatars}"> ${movie.rating} </span>
         <span class="iteminfo">${movie.user.handle}</span>
        </label>

        </header>
        ${escape(movie.content.text)}
        <footer class="itemfooter"><h8>Added to your list ${totalDate} days ago</h8></footer>
      </article>`
  )
  return movieTemplate;
}

