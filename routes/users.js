/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

// app.get("/search", (req, res) => {
//   res.render("search");
// });

// app.get("/login", (req, res) => {
//   res.render("login");
// });

// app.post("/", (req, res) => {
//   res.render("index");
// });

router.post("/login", (req, res) => {
   const username = req.body.username;
   const password = req.body.password;
   const inputCred = [username, password]
   db.query(`SELECT id, first_name FROM users WHERE username = $1 AND password = $2`, inputCred)
     .then(data => {
       if (data) {
         const userId = [data.rows[0].id];
         const firstName = [data.rows[0].first_name];
         db.query(`SELECT * FROM users
         JOIN films ON users.id = films.user_id
         JOIN books ON users.id = books.user_id
         JOIN restaurants ON users.id = restaurants.user_id
         JOIN products ON users.id = products.user_id
         WHERE users.id = $1
         `, userId)
          .then(data => {
            templateVars = {
              films: [],
              books: [],
              restaurants : [],
              products: [],
              id: userId[0],
              name: firstName[0]
            }
            for (let i = 0; i < data.rows.length; i++) {
              templateVars.films.push({
                 title: data.rows[i].film_title,
                 poster_img: data.rows[i].poster_img,
                 imdb_rating: data.rows[i].imdb_rating,
                 genre: data.rows[i].genre,
              })
              templateVars.books.push({
                book_title: data.rows[i].book_title,
                author: data.rows[i].author,
                book_rating: data.rows[i].book_rating,
                page_count: data.rows[i].page_count,
              })
              templateVars.restaurants.push({
                restaurant_name: data.rows[i].restaurant_name,
                phone_number: data.rows[i].phone_number,
                image_url: data.rows[i].image_url,
                restaurant_rating: data.rows[i].restaurant_rating,
                type_of_food: data.rows[i].type_of_food,
                address: data.rows[i].address,
                url: data.rows[i].url,
              })
              templateVars.products.push ({
                product_name: data.rows[i].product_name,
                price: data.rows[i].price,
                picture: data.rows[i].picture,
              })
            }
            console.log(templateVars);
            res.render("index", templateVars);
          })
       } else {
         res.render("login");
       }
     })
})

  return router;
};
