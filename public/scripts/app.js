// $(document).ready(function() {
// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });




// const $searchValue = $("#searchvalue");
// $searchValue.on('submit', function (event) {
//   let reqHeader = new Headers();
//   reqHeader.append("X-Requested-With", "XMLHttpRequest");
//   let initObject = {
//     headers: reqHeader,
//   };
//   event.preventDefault();
//   const compareVal = $searchValue.children('.input').val();
//   const searchVal = encodeURIComponent($searchValue.children('.input').val());
//   const urls = [new Request(`https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=${searchVal}&apikey=7f07f227`, initObject), new Request(`https://cors-anywhere.herokuapp.com/https://www.googleapis.com/books/v1/volumes?q=${searchVal}`, initObject),
//    new Request(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchVal}&location=Vancouver`,{headers: new Headers({"X-Requested-With" : "XMLHttpRequest" , Authorization: `bearer 3FBAcWOG77mn6vnlH-h_MWWF0_R7IeUn7BjKa76xFFF3fmWjW6qMPpyQqcST8eYer0-hWocdBUxnWqPhw8zq7qHBhk5FJ9U1ZXnlxBPsp7KKXyGCmeKcajJiHHSrXXYx`})}),
//    `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?format=json&keyword=${searchVal}&applicationId=1091241407601641232`];
//   let searchOutput = {};
//   Promise.all(urls.map(url =>
//   fetch(url).then(res =>
//    res.json()
//   )
//     )).then((out) => {
//       console.log(out);
//       if (compareVal.toLowerCase() === out[0].Title.toLowerCase()) {
//         searchOutput = {
//           title: out[0].Title,
//           poster: out[0].Poster,
//           rating: out[0].imdbRating,
//           genre: out[0].Genre,
//           type: "movie"
//         };
//       } else if (compareVal.toLowerCase() === out[1].items[0].volumeInfo.title.toLowerCase()) {
//           searchOutput = {
//             title: out[1].items[0].volumeInfo.title,
//             author: out[1].items[0].volumeInfo.authors[0],
//             rating: out[1].items[0].volumeInfo.averageRating,
//             page_count: out[1].items[0].volumeInfo.pageCount,
//             type: "book"
//           }
//       } else if (compareVal.toLowerCase() === out[2].businesses[0].name.toLowerCase()) {
//         searchOutput = {
//           name: out[2].businesses[0].name,
//           phone_number: out[2].businesses[0].phone,
//           image_url: out[2].businesses[0].image_url,
//           rating: out[2].businesses[0].rating,
//           type_of_food: out[2].businesses[0].categories[0].title,
//           address: out[2].businesses[0].location.address1,
//           type: "restaurant"
//         }
//       } else {
//         searchOutput = {
//           name: out[3].Items.itemName,
//           price: out[3].Items.itemPrice,
//           image: out[3].Items.itemUrl,
//           type: "product"
//         }
//       }
//       console.log(searchOutput);
//  }).catch(err => console.error(err));


// })


// });
