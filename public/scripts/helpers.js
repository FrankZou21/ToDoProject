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

// RESTAURANTS

const createRestaurantElement = function (restaurant) {
  let timeStart = Date.now();
  let millis = Date.now() - restaurant.created_at;
  let dateStamp = (millis / (60 * 60 * 24 * 1000))
  let totalDate = Math.round(dateStamp);

  const restaurantTemplate = (
    `<article class="restaurant-body">
         <header class="itemheader">
          <span id="usericon"><img src="${tweet.user.avatars}"> ${tweet.user.name} </span><span class="username">${tweet.user.handle}</span>
        </header>
        ${escape(restaurant.content.text)}
        <footer class="tweetfooter"><h8>${totalDate} days ago</h8><div class="icons"><i class="fab fa-font-awesome-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></div></footer>
      </article>`
  )
  return restaurantTemplate;
}

// BOOKS

const createBookElement = function (book) {
  let timeStart = Date.now();
  let millis = Date.now() - books.created_at;
  let dateStamp = (millis / (60 * 60 * 24 * 1000))
  let totalDate = Math.round(dateStamp);

  const bookTemplate = (
    `<article class="book-body">
         <header class="itemheader">
          <span id="usericon"><img src="${tweet.user.avatars}"> ${book.user.name} </span><span class="username">${tweet.user.handle}</span>
        </header>
        ${escape(book.content.text)}
        <footer class="tweetfooter"><h8>${totalDate} days ago</h8><div class="icons"><i class="fab fa-font-awesome-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></div></footer>
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
    `<article class="product-body">
         <header class="itemheader">
          <span id="usericon"><img src="${product.user.avatars}"> ${product.user.name} </span><span class="username">${tweet.user.handle}</span>
        </header>
        ${escape(product.content.text)}
        <footer class="tweetfooter"><h8>${totalDate} days ago</h8><div class="icons"><i class="fab fa-font-awesome-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></div></footer>
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
    `<article class="movie-body">
         <header class="itemheader">
          <span id="usericon"><img src="${movie.user.avatars}"> ${movie.user.name} </span><span class="username">${movie.user.handle}</span>
        </header>
        ${escape(book.content.text)}
        <footer class="tweetfooter"><h8>${totalDate} days ago</h8><div class="icons"><i class="fab fa-font-awesome-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></div></footer>
      </article>`
  )
  return movieTemplate;
}

