/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    const userId = req.session.user_id;
    if (userId) {
    Promise.all([
      db.query(`SELECT * FROM films WHERE films.user_id_films = $1`, userId),
      db.query(`SELECT * FROM books WHERE books.user_id_books = $1`, userId),
      db.query(`SELECT * FROM restaurants WHERE restaurants.user_id_restaurants = $1`, userId),
      db.query(`SELECT * FROM products WHERE products.user_id_products = $1`, userId),
      db.query(`SELECT first_name FROM users WHERE id = $1`, userId)
    ])
      .then(([films, books, restaurants, products, firstName]) => {
        const templateVars = {
          films: films.rows,
          books: books.rows,
          restaurants: restaurants.rows,
          products: products.rows,
          id: userId[0],
          name: firstName.rows[0].first_name,
          cookie: userId[0]
        }
        console.log(templateVars);
        res.render("index", templateVars);
      })
    } else [
      res.redirect("/api/users/login")
    ]
  });

  router.post("/delete", (req, res) => {

  })

  router.get("/login", (req, res) => {
    res.render("login")
  })


  router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const inputCred = [username, password]
    db.query(`SELECT id, first_name FROM users WHERE username = $1 AND password = $2`, inputCred)
      .then(data => {
        if (data) {
          const userId = [data.rows[0].id];
          req.session.user_id = userId;
          res.redirect("/api/users");

        } else {
          res.redirect("/login");
        }
      })
  })

  router.post("/logout", (req, res) => {
    req.session.user_id = null;
    res.redirect("login");
  })

  router.post("/index", (req, res) => {
    // console.log(req.body.searchInput);
    // console.log(req.body.searchType);
    const name = req.body.searchInput;
    const type = req.body.searchType;
    let selectorName;
    if (type === "films") {
      selectorName = "film_title"
    } else if (type === "books") {
      selectorName = "book_title"
    } else if (type === restaurants) {
      selectorName = "restaurant_name"
    } else {
      selectorName = "product_name"
    }
    const queryInput = [req.session.user_id[0], name]
    console.log(queryInput);
    db.query(`UPDATE ${type} SET user_id_films = $1 WHERE ${selectorName} = $2;`, queryInput)
      .then(() => {
        console.log("HI")
        res.redirect("/api/users/")
      })
  })
  return router;
};
