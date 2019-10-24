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
    console.log(userId);
    if (userId) {
      Promise.all([
        db.query('SELECT * FROM films WHERE films.user_id_films=$1', userId),
        db.query('SELECT * FROM books WHERE books.user_id_books=$1', userId),
        db.query('SELECT * FROM restaurants WHERE restaurants.user_id_restaurants=$1', userId),
        db.query('SELECT * FROM products WHERE products.user_id_products=$1', userId),
        db.query('SELECT first_name FROM users WHERE users.id = $1', userId)
      ])
        .then(([films, books, restaurants, products, firstName]) => {
          const templateVars = {
            films: films.rows,
            books: books.rows,
            restaurants: restaurants.rows,
            products: products.rows,
            id: userId[0],
            name: firstName.rows[0].first_name,
            cookie: req.session.user_id[0]
          }
          // console.log(templateVars);
          res.render("index", templateVars);
        })
    } else[
      res.redirect("/api/users/login")
    ]
  });


  router.get("/login", (req, res) => {
    res.render("login")
  })

  router.get("/register", (req, res) => {
    res.render("register")
  })

  router.post("/logout", (req, res) => {
    req.session.user_id = null;
    res.redirect("/api/users/login")
  })

  router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const inputCred = [username, password]
    db.query("SELECT * from users WHERE username=$1 AND password=$2;", inputCred)
      .then(data => {
        if (data.rows) {
          const userId = [data.rows[0].id];
          req.session.user_id = userId;
          res.redirect("/api/users");

        } else {
          res.redirect("/api/users/login");
        }
      })
  })

  router.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const first_name = req.body.first_name;
    const registerCred = [username, password, first_name]
    if (username !== null && password !== null && first_name !== null) {
      db.query(`INSERT INTO users (username, password, first_name, id)
  Values($1, $2, $3, (SELECT (MAX(id)+1) from "users"))
  RETURNING *`, registerCred)
        .then((data) => {
          console.log(`the output is ${data.rows[0].id}`);
          req.session.user_id = [data.rows[0].id];
          res.redirect("/api/users");
        })
    } else {
      res.redirect("/api/users/register")
    }
  })

  //posting from search to main page, updating database with userid
  router.post("/index", (req, res) => {
    const name = req.body.searchInput;
    const type = req.body.searchType;
    let selectorId;
    let selectorName;
    if (type === "films") {
      selectorName = "film_title";
      selectorId = "user_id_films";
    } else if (type === "books") {
      selectorName = "book_title";
      selectorId = "user_id_books";
    } else if (type === "restaurants") {
      selectorName = "restaurant_name";
      selectorId = "user_id_restaurants";
    } else {
      selectorName = "product_name";
      selectorId = "user_id_products";
    }
    const queryInput = [req.session.user_id[0], name]
    console.log(queryInput);
    db.query(`UPDATE ${type} SET ${selectorId} = $1 WHERE ${selectorName} = $2`, queryInput)
      .then(() => {
        res.redirect("/api/users/")
      })
  })


  //removing item from its category
  router.post("/remove", (req, res) => {
    const name = req.body.removeInput;
    const userId = req.session.user_id[0];
    const type = req.body.removeType;
    let selectorId;
    let selectorName;
    if (type === "films") {
      selectorName = "film_title";
      selectorId = "user_id_films";
    } else if (type === "books") {
      selectorName = "book_title";
      selectorId = "user_id_books";
    } else if (type === "restaurants") {
      selectorName = "restaurant_name";
      selectorId = "user_id_restaurants";
    } else {
      selectorName = "product_name";
      selectorId = "user_id_products";
    }
    const queryUpdate = [null, name, userId];
    //UPDATE films SET user_id_films = null WHERE film_title = eragon AND user_id_films = 3
    db.query(`UPDATE ${type} SET ${selectorId} = $1 WHERE ${selectorName}=$2 AND ${selectorId}=$3`, queryUpdate)
      .then(() => {
        res.redirect("/api/users");
      })
  })



  //Editing the category of item (books, films, restaurants, products)
  router.post("/edit", (req, res) => {
    console.log(req.body);
    const name = req.body.editInput;
    const oldType = req.body.oldType;
    const newType = String(req.body.category);
    const userId = req.session.user_id;
    let oldSelectorName;
    let oldSelectorId;
    let newSelectorName;
    let newSelectorId;

    if (oldType === "films") {
      oldSelectorName = "film_title";
      oldSelectorId = "user_id_films";
    } else if (oldType === "books") {
      oldSelectorName = "book_title";
      oldSelectorId = "user_id_books";
    } else if (oldType === "restaurants") {
      oldSelectorName = "restaurant_name";
      oldSelectorId = "user_id_restaurants";
    } else {
      oldSelectorName = "product_name";
      oldSelectorId = "user_id_products";
    }


    if (newType === "films") {
      newSelectorName = "film_title";
      newSelectorId = "user_id_films";
    } else if (newType === "books") {
      newSelectorName = "book_title";
      newSelectorId = "user_id_books";
    } else if (newType === "restaurants") {
      newSelectorName = "restaurant_name";
      newSelectorId = "user_id_restaurants";
    } else {
      newSelectorName = "product_name";
      newSelectorId = "user_id_products";
    }

    console.log(oldSelectorName);
    console.log(oldSelectorId);
    console.log(newSelectorName);
    console.log(newSelectorId);

    const oldQueryInput = [null, name, userId[0]];
    const newQueryInput = [userId[0], name];
    //UPDATE films SET user_id_films = null WHERE  film_title = eragon AND user_id_films = 3;
    //UPDATE books SET user_id_books = 3 WHERE  book_title = eragon AND user_id_books = null;
    // db.query(`UPDATE ${type} SET ${selectorId} = $1 WHERE ${selectorName} = $2`, queryInput)
    Promise.all([
      db.query(`UPDATE ${oldType} SET ${oldSelectorId} = $1 WHERE ${oldSelectorName}=$2 AND ${oldSelectorId}=$3`, oldQueryInput),
      db.query(`UPDATE ${newType} SET ${newSelectorId} = $1 WHERE ${newSelectorName}=$2 AND ${newSelectorId} is null`, newQueryInput),
    ])
      .then(() => {
        res.redirect("/api/users")
      })
  })

  return router;
};

