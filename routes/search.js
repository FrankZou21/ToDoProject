const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {
  router.get("/", (req, res) => {
    const compareVal = req.query.queryparams
    if (compareVal) {
      const searchVal = encodeURIComponent(req.query.queryparams);
      movieUrl = {
        url1: `http://www.omdbapi.com/?t=${searchVal}&apikey=7f07f227`,
        header: {}
      }

      bookUrl = {
        url1: `https://www.googleapis.com/books/v1/volumes?q=${searchVal}`,
        header: {}
      }

      restaurantUrl = {
        url1: `https://api.yelp.com/v3/businesses/search?term=${searchVal}&location=Vancouver`,
        header: {
          headers: {
            Authorization: `bearer 3FBAcWOG77mn6vnlH-h_MWWF0_R7IeUn7BjKa76xFFF3fmWjW6qMPpyQqcST8eYer0-hWocdBUxnWqPhw8zq7qHBhk5FJ9U1ZXnlxBPsp7KKXyGCmeKcajJiHHSrXXYx`
          }
        }
      }

      productUrl = {
        url1: `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?format=json&keyword=${searchVal}&applicationId=1091241407601641232`,
        header: {}
      }
      const urls = [movieUrl, bookUrl, restaurantUrl, productUrl];
      let searchOutput = {};
      Promise.all(urls.map(url =>
        axios.get(url.url1, url.header)
      )).then((out) => {
        const movie = out[0].data;
        const book = out[1].data;
        const restaurant = out[2].data;
        const product = out[3].data;
        if (movie.Title === undefined) {
          movie.Title = "placeholder"
        }
        if (book.items[0].volumeInfo.title === undefined) {
          book.items[0] = {
            volumeInfo: {
              title: "placeholder"
            }
          }
        }
        if (restaurant.businesses[0] === undefined) {
          restaurant.businesses[0] = {};
          restaurant.businesses[0].name = "placeholder";
        }


        if (compareVal.toLowerCase() === movie.Title.toLowerCase()) {
          searchOutput = { //Information for movies
            title: movie.Title,
            poster: movie.Poster,
            rating: movie.imdbRating,
            genre: movie.Genre,
            type: "films"
          };

          const insertVal = [searchOutput.title, searchOutput.poster, Number(searchOutput.rating), searchOutput.genre, 1];
          db.query(`INSERT INTO films (film_title, poster_img, imdb_rating, genre, user_id_films)
        VALUES ($1, $2, $3, $4, $5);`, insertVal)
            .then(() => {
              console.log("IT WORKED");
            })
            .catch((err) => {
              console.log(err);
            })
        } else if (compareVal.toLowerCase() === book.items[0].volumeInfo.title.toLowerCase()) {
          searchOutput = { // Info for books
            title: book.items[0].volumeInfo.title,
            author: book.items[0].volumeInfo.authors[0],
            rating: book.items[0].volumeInfo.averageRating,
            page_count: book.items[0].volumeInfo.pageCount,
            type: "books"
          }
          db.query(`INSERT INTO books (book_title, author, book_rating, page_count, user_id_books)
          VALUES (${searchOutput.title}, ${searchOutput.author}, ${Number(searchOutput.rating)}, ${Number(searchOutput.page_count)}, 1);`)
            .then(() => {
              console.log("IT WORKED");
            })
        } else if (compareVal.toLowerCase() === restaurant.businesses[0].name.toLowerCase()) {
          searchOutput = { // Info for restaurants
            name: restaurant.businesses[0].name,
            phone_number: restaurant.businesses[0].phone,
            image_url: restaurant.businesses[0].image_url,
            rating: restaurant.businesses[0].rating,
            type_of_food: restaurant.businesses[0].categories[0].title,
            address: restaurant.businesses[0].location.address1,
            type: "restaurants"
          }
          db.query(`INSERT INTO restaurants (restaurant_name, phone_number, image_url, restaurant_rating, type_of_food, address, user_id_restaurants)
        VALUES (${searchOutput.name}, ${searchOutput.phone_number}, ${searchOutput.image_url}, ${Number(searchOutput.rating)},
        ${searchOutput.type_of_food},${searchOutput.address}, 1);`)
            .then(() => {
              console.log("IT WORKED");
            })
        } else { // Info for products
          searchOutput = {
            name: product.Items.itemName,
            price: product.Items.itemPrice,
            image: product.Items.itemUrl,
            type: "products",
            cookie: req.session.user_id[0]
          }
          db.query(`INSERT INTO products (product_name, price, picture, user_id_products)
        VALUES (${searchOutput.name}, ${Number(searchOutput.price)}, ${searchOutput.image}, 1);`)
            .then(() => {
              console.log("IT WORKED");
            })
        }
        res.render("search", searchOutput);
        // res.render("index");
        // console.log(searchOutput);
      }).catch(err => console.error(err));
    } else {
      res.redirect("/api/users/login")
    }
  });
  return router;
};
