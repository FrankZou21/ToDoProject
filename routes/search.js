const express = require('express');
const router  = express.Router();
const axios = require('axios');


//    new Request(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchVal}&location=Vancouver`,{headers: new Headers({"X-Requested-With" : "XMLHttpRequest" , Authorization: `bearer 3FBAcWOG77mn6vnlH-h_MWWF0_R7IeUn7BjKa76xFFF3fmWjW6qMPpyQqcST8eYer0-hWocdBUxnWqPhw8zq7qHBhk5FJ9U1ZXnlxBPsp7KKXyGCmeKcajJiHHSrXXYx`})}),

module.exports = (db) => {
  router.get("/", (req, res) => {
    // console.log(req.query.queryparams);
  const compareVal = req.query.queryparams
  const searchVal = encodeURIComponent(req.query.queryparams);
   movieUrl = {
    url1:`http://www.omdbapi.com/?t=${searchVal}&apikey=7f07f227`,
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
      if (restaurant.businesses[0].name === undefined) {
        restaurant.businesses[0].name = "placeholder"
      }
      if (compareVal.toLowerCase() === movie.Title.toLowerCase()) {
        searchOutput = {
          title: movie.Title,
          poster: movie.Poster,
          rating: movie.imdbRating,
          genre: movie.Genre,
          type: "movie"
        };
      } else if (compareVal.toLowerCase() === book.items[0].volumeInfo.title.toLowerCase()) {
          searchOutput = {
            title: book.items[0].volumeInfo.title,
            author: book.items[0].volumeInfo.authors[0],
            rating: book.items[0].volumeInfo.averageRating,
            page_count: book.items[0].volumeInfo.pageCount,
            type: "book"
          }
      } else if (compareVal.toLowerCase() === restaurant.businesses[0].name.toLowerCase()) {
        searchOutput = {
          name: restaurant.businesses[0].name,
          phone_number: restaurant.businesses[0].phone,
          image_url: restaurant.businesses[0].image_url,
          rating: restaurant.businesses[0].rating,
          type_of_food: restaurant.businesses[0].categories[0].title,
          address: restaurant.businesses[0].location.address1,
          type: "restaurant"
        }
      } else {
        searchOutput = {
          name: product.Items.itemName,
          price: product.Items.itemPrice,
          image: product.Items.itemUrl,
          type: "product"
        }
      }
      res.render("search", templateVars = searchOutput);
      console.log(searchOutput);
 }).catch(err => console.error(err));
  });
  return router;
};
