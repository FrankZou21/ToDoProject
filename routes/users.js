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
        rs });res.json({ use
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

router.post("/login", (req, res) => {
   const username = req.body.username;
   const password = req.body.password;
   const inputCred = [username, password]
   db.query(`SELECT id, first_name FROM users WHERE username = $1 AND password = $2`, inputCred)
     .then(data => {
       if (data) {
         const userId = [data.rows[0].id];
         const firstName = [data.rows[0].first_name];
         req.session.user_id = userId;
         Promise.all([
          db.query(`SELECT * FROM films WHERE films.user_id_films = $1`, userId),
          db.query(`SELECT * FROM books WHERE books.user_id_books = $1`, userId),
          db.query(`SELECT * FROM restaurants WHERE restaurants.user_id_restaurants = $1`, userId),
          db.query(`SELECT * FROM products WHERE products.user_id_products = $1`, userId)
        ])
      .then(([films, books, restaurants, products]) => {
        const templateVars = {
          films: films.rows,
          books: books.rows,
          restaurants: restaurants.rows,
          products: products.rows,
          id: userId[0],
          name: firstName[0],
          cookie: userId[0]
        }
        console.log(templateVars);
        res.render("index", templateVars);
      })
    } else {
      res.render("login");
    }
  })
})



//For Jensen commented out code for outerjoin

    //      db.query(`SELECT * FROM users
    //      JOIN films ON users.id = films.user_id_films
    //      JOIN books ON users.id = books.user_id_books
    //      JOIN restaurants ON users.id = restaurants.user_id_restaurants
    //      JOIN products ON users.id = products.user_id_products
    //      WHERE users.id = $1
    //      `, userId)


    //       .then(data => {
    //         templateVars = {
    //           films: [],
    //           books: [],
    //           restaurants : [],
    //           products: [],
    //           id: userId[0],
    //           name: firstName[0]
    //         }
    //         for (let i = 0; i < data.rows.length; i++) {
    //           templateVars.films.push({
    //              title: data.rows[i].film_title,
    //              poster_img: data.rows[i].poster_img,
    //              imdb_rating: data.rows[i].imdb_rating,
    //              genre: data.rows[i].genre,
    //           })
    //           templateVars.books.push({
    //             book_title: data.rows[i].book_title,
    //             author: data.rows[i].author,
    //             book_rating: data.rows[i].book_rating,
    //             page_count: data.rows[i].page_count,
    //           })
    //           templateVars.restaurants.push({
    //             restaurant_name: data.rows[i].restaurant_name,
    //             phone_number: data.rows[i].phone_number,
    //             image_url: data.rows[i].image_url,
    //             restaurant_rating: data.rows[i].restaurant_rating,
    //             type_of_food: data.rows[i].type_of_food,
    //             address: data.rows[i].address,
    //             url: data.rows[i].url,
    //           })
    //           templateVars.products.push ({
    //             product_name: data.rows[i].product_name,
    //             price: data.rows[i].price,
    //             picture: data.rows[i].picture,
    //           })
    //         }
    //         res.render("index", templateVars);
    //       })
    //    } else {
    //      res.render("login");
    //    }
    //  })
// })

router.post("/index", (req, res) => {
  // console.log(req.body.searchInput);
  // console.log(req.body.searchType);
  const name = req.body.searchInput;
  const type = req.body.searchType;
  let selectorName;
  if (type === "films" ) {
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
    .then(() => Promise.all([
        db.query(`SELECT * FROM films WHERE films.user_id_films = $1`, [req.session.user_id[0]]),
        db.query(`SELECT * FROM books WHERE books.user_id_books = $1`, [req.session.user_id[0]]),
        db.query(`SELECT * FROM restaurants WHERE restaurants.user_id_restaurants = $1`, [req.session.user_id[0]]),
        db.query(`SELECT * FROM products WHERE products.user_id_products = $1`, [req.session.user_id[0]])
      ])
    )
    .then(([films, books, restaurants, products]) => {
      const templateVars = {
        films: films.rows,
        books: books.rows,
        restaurants: restaurants.rows,
        products: products.rows,
        cookie: req.session.user_id[0]
      }
      console.log(templateVars);
      res.render("index", templateVars);
    })

})
  return router;
};
