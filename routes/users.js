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

<<<<<<< HEAD


  // router.get("/", (req, res) => {
  //   res.render("index");
  // });

  // router.post("/", (req, res) => {
  //   res.redirect("/");
=======
  // router.get("/login", (req, res) => {
  //   const username = req.params.username;
  //   const password = req.params.password;
  //   db.query(`SELECT id FROM users WHERE username = ${username} AND password = ${password}`)
  //     .then(data => {
  //       if (data) {
  //         res.render("index", {id:data.rows});
  //       } else {
  //         res.render("index");
  //       }
  //     })
>>>>>>> ce0181ac4af206060a13b8ca6b6a0dc5f7bc9e5c
  // })

  return router;
};
