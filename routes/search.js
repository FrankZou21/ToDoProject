const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {
  router.get("/", (req, res) => {
    const compareVal = req.query.queryparams
    const user_id = req.session.user_id;
    if (compareVal) {
      let searchVal = encodeURIComponent(req.query.queryparams);
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
      // let searchOutput = {};
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
          restaurant.businesses[0] = {
            categories: [{
              title: null
            }],
            location: {
              address1: null
            }
          };
          restaurant.businesses[0].name = "placeholder";
        }
        if (product.Items === undefined) {
          product.Items = {
            itemName: null,
            itemPrice: null,
            itemUrl: null
          }
        }


        //TEST
        const searchOutputMovie = { //Information for movies
          title: movie.Title,
          poster: movie.Poster,
          rating: movie.imdbRating,
          genre: movie.Genre,
          type: "films"
        };

        const searchOutputBook = { // Info for books
          title: book.items[0].volumeInfo.title,
          author: book.items[0].volumeInfo.authors[0],
          rating: book.items[0].volumeInfo.averageRating,
          page_count: book.items[0].volumeInfo.pageCount,
          type: "books"
        }

        const searchOutputRestaurant = { // Info for restaurants
          title: restaurant.businesses[0].name,
          phone_number: restaurant.businesses[0].phone,
          image_url: restaurant.businesses[0].image_url,
          rating: restaurant.businesses[0].rating,
          type_of_food: restaurant.businesses[0].categories[0].title,
          address: restaurant.businesses[0].location.address1,
          type: "restaurants"
        }

        const searchOutputProduct = { // Info for restaurants
            title: product.Items.itemName,
            price: product.Items.itemPrice,
            image: product.Items.itemUrl,
            type: "products"
        }

        // const insertValMovie = [searchOutputMovie.title, searchOutputMovie.poster, searchOutputMovie.rating, searchOutputMovie.genre];
        // const insertValBook = [searchOutputBook.title, searchOutputBook.author, searchOutputBook.rating, searchOutputBook.page_count];
        // const insertValRestaurant = [searchOutputRestaurant.title, searchOutputRestaurant.phone_number, searchOutputRestaurant.image_url, searchOutputRestaurant.rating, searchOutputRestaurant.type_of_food, searchOutputRestaurant.address];
        // const insertValProduct = [searchOutputProduct.title, searchOutputProduct.price, searchOutputProduct.image];

        if (compareVal.toLowerCase() === movie.Title.toLowerCase()) {
          searchVal = movie.Title;
        } else if (compareVal.toLowerCase() === book.items[0].volumeInfo.title.toLowerCase()) {
          searchVal = book.items[0].volumeInfo.title;
        }  else if (compareVal.toLowerCase() === restaurant.businesses[0].name.toLowerCase()) {
          searchVal = restaurant.businesses[0].name;
        } else {
          searchVal = product.Items.itemName;
        }

        const insertValMovie = [searchVal, searchOutputMovie.poster, searchOutputMovie.rating, searchOutputMovie.genre];
        const insertValBook = [searchVal, searchOutputBook.author, searchOutputBook.rating, searchOutputBook.page_count];
        const insertValRestaurant = [searchVal, searchOutputRestaurant.phone_number, searchOutputRestaurant.image_url, searchOutputRestaurant.rating, searchOutputRestaurant.type_of_food, searchOutputRestaurant.address];
        const insertValProduct = [searchVal, searchOutputProduct.price, searchOutputProduct.image];


        Promise.all([
          db.query(`INSERT INTO films (film_title, poster_img, imdb_rating, genre)
          VALUES ($1, $2, $3, $4);`, insertValMovie),
          db.query(`INSERT INTO books (book_title, author, book_rating, page_count)
          VALUES ($1, $2, $3, $4);`, insertValBook),
          db.query(`INSERT INTO restaurants (restaurant_name, phone_number, image_url, restaurant_rating, type_of_food, address)
          VALUES ($1, $2, $3, $4, $5, $6);`, insertValRestaurant),
          db.query(`INSERT INTO products (product_name, price, picture)
          VALUES ($1, $2, $3);`, insertValProduct)
        ])
          .then(() => {
            if (compareVal.toLowerCase() === movie.Title.toLowerCase()) {
              res.render("search", searchOutputMovie);
            } else if (compareVal.toLowerCase() === book.items[0].volumeInfo.title.toLowerCase()) {
              res.render("search", searchOutputBook);
            }  else if (compareVal.toLowerCase() === restaurant.businesses[0].name.toLowerCase()) {
              res.render("search", searchOutputRestaurant);
            } else {
              res.render("search", searchOutputProduct);
            }
          })
//         if (compareVal.toLowerCase() === movie.Title.toLowerCase()) {
//           searchOutput = { //Information for movies
//             title: movie.Title,
//             poster: movie.Poster,
//             rating: movie.imdbRating,
//             genre: movie.Genre,
//             type: "films"
//           };
//           const insertVal = [searchOutput.title, searchOutput.poster, Number(searchOutput.rating), searchOutput.genre, user_id[0]];
//           db.query(`INSERT INTO films (film_title, poster_img, imdb_rating, genre, user_id_films)
//         VALUES ($1, $2, $3, $4, $5);`, insertVal)
//             .then(() => {
//               console.log("IT WORKED");
//               res.render("search", searchOutput);
//             })
//             .catch((err) => {
//               console.log(err);
//             })
//         } else if (compareVal.toLowerCase() === book.items[0].volumeInfo.title.toLowerCase()) {
//           searchOutput = { // Info for books
//             title: book.items[0].volumeInfo.title,
//             author: book.items[0].volumeInfo.authors[0],
//             rating: book.items[0].volumeInfo.averageRating,
//             page_count: book.items[0].volumeInfo.pageCount,
//             type: "books"
//           }
//           const insertVal = [searchOutput.title, searchOutput.author, Number(searchOutput.rating), Number(searchOutput.page_count), user_id[0]]
//           console.log(insertVal);
//           db.query(`INSERT INTO books (book_title, author, book_rating, page_count, user_id_books)
//           VALUES ($1, $2, $3, $4, $5);`, insertVal)
//             .then(() => {
//               res.render("search", searchOutput);
//             })
//         } else if (compareVal.toLowerCase() === restaurant.businesses[0].name.toLowerCase()) {
//           searchOutput = { // Info for restaurants
//             title: restaurant.businesses[0].name,
//             phone_number: restaurant.businesses[0].phone,
//             image_url: restaurant.businesses[0].image_url,
//             rating: restaurant.businesses[0].rating,
//             type_of_food: restaurant.businesses[0].categories[0].title,
//             address: restaurant.businesses[0].location.address1,
//             type: "restaurants"
//           }

//           console.log(searchOutput);
//           const insertVal = [searchOutput.title, searchOutput.phone_number, searchOutput.image_url, Number(searchOutput.rating), searchOutput.type_of_food, searchOutput.address, user_id[0]]
//           db.query(`INSERT INTO restaurants (restaurant_name, phone_number, image_url, restaurant_rating, type_of_food, address, user_id_restaurants)
// VALUES ($1, $2, $3, $4, $5, $6, $7);`, insertVal)
//             .then(() => {
//               console.log("IT WORKED");
//               res.render("search", searchOutput);
//             })
//         } else { // Info for products
//           searchOutput = {
//             title: product.Items.itemName,
//             price: product.Items.itemPrice,
//             image: product.Items.itemUrl,
//             type: "products",
//           }

//           const insertVal = [searchOutput.title, Number(searchOutput.price), searchOutput.image, user_id[0]]
//           db.query(`INSERT INTO products (product_name, price, picture, user_id_products)
//         VALUES ($1, $2, $3, $4);`, insertVal)
//             .then(() => {
//               console.log("IT WORKED");
//               res.render("search", searchOutput);
//             })
//         }
        // res.render("index");
        // console.log(searchOutput);
      }).catch(err => console.error(err));
    } else {
      res.redirect("/api/users/login")
    }
  });
  return router;
};

