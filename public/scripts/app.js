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
  event.preventDefault();
  console.log($searchValue.children('.input').val());
  const searchValMovie = encodeURIComponent($searchValue.children('.input').val());
    fetch(`http://www.omdbapi.com/?t=${searchValMovie}&apikey=7f07f227`)
      .then(res => res.json())
        .then((out) => {
          console.log('Output: ', out);
    }).catch(err => console.error(err));
    })


  });
