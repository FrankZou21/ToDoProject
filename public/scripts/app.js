$(document).ready(function() {
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




const $searchValue = $("#searchvalue");
$searchValue.on('submit', function (event) {
  let reqHeader = new Headers();
  reqHeader.append("X-Requested-With", "XMLHttpRequest");
  let initObject = {
    headers: reqHeader,
  };
  event.preventDefault();
  const searchVal = encodeURIComponent($searchValue.children('.input').val());
  const urls = [new Request(`https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=${searchVal}&apikey=7f07f227`, initObject), new Request(`https://cors-anywhere.herokuapp.com/https://www.googleapis.com/books/v1/volumes?q=${searchVal}`, initObject),
   new Request(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchVal}&location=Vancouver`,{headers: new Headers({"X-Requested-With" : "XMLHttpRequest" , Authorization: `bearer 3FBAcWOG77mn6vnlH-h_MWWF0_R7IeUn7BjKa76xFFF3fmWjW6qMPpyQqcST8eYer0-hWocdBUxnWqPhw8zq7qHBhk5FJ9U1ZXnlxBPsp7KKXyGCmeKcajJiHHSrXXYx`})}),
   `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?format=json&keyword=${searchVal}&applicationId=1091241407601641232`];
  let searchOutput = [];
  Promise.all(urls.map(url =>
  fetch(url).then(res =>
   res.json()
  )
    )).then((out) => {
      searchOutput = out;
      console.log(searchOutput);

 }).catch(err => console.error(err));


})


});
