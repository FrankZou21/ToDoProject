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
      console.log(out[0].data);
      console.log();
      console.log(out[1].data);
      console.log();
      console.log(out[2].data);
      console.log();
      console.log(out[3].data);
      // if (compareVal.toLowerCase() === out[0].Title.toLowerCase()) {
      //   searchOutput = {
      //     title: out[0].Title,
      //     poster: out[0].Poster,
      //     rating: out[0].imdbRating,
      //     genre: out[0].Genre,
      //     type: "movie"
      //   };
      // } else if (compareVal.toLowerCase() === out[1].items[0].volumeInfo.title.toLowerCase()) {
      //     searchOutput = {
      //       title: out[1].items[0].volumeInfo.title,
      //       author: out[1].items[0].volumeInfo.authors[0],
      //       rating: out[1].items[0].volumeInfo.averageRating,
      //       page_count: out[1].items[0].volumeInfo.pageCount,
      //       type: "book"
      //     }
      // } else if (compareVal.toLowerCase() === out[2].businesses[0].name.toLowerCase()) {
      //   searchOutput = {
      //     name: out[2].businesses[0].name,
      //     phone_number: out[2].businesses[0].phone,
      //     image_url: out[2].businesses[0].image_url,
      //     rating: out[2].businesses[0].rating,
      //     type_of_food: out[2].businesses[0].categories[0].title,
      //     address: out[2].businesses[0].location.address1,
      //     type: "restaurant"
      //   }
      // } else {
      //   searchOutput = {
      //     name: out[3].Items.itemName,
      //     price: out[3].Items.itemPrice,
      //     image: out[3].Items.itemUrl,
      //     type: "product"
      //   }
      // }
      // console.log(searchOutput);
 }).catch(err => console.error(err));




//  `https://api.yelp.com/v3/businesses/search?term=${searchVal}&location=Vancouver`, {
//   headers: {
//     Authorization: `bearer 3FBAcWOG77mn6vnlH-h_MWWF0_R7IeUn7BjKa76xFFF3fmWjW6qMPpyQqcST8eYer0-hWocdBUxnWqPhw8zq7qHBhk5FJ9U1ZXnlxBPsp7KKXyGCmeKcajJiHHSrXXYx`
//   }
// },













    res.render("index");
  });
  return router;
};
