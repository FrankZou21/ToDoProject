//
//
// ANNE'S TINKERING, please disregard this file as necessary :)
//
//


const express = require("express");
const app = express();
const PORT = 8080;

const bcrypt = require('bcrypt');

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ["gorilla"],}));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");


// IMPORTING HELPER FUNCTIONS

const getUserByEmail = require("./helpers.js");


////// DATABASE



// RESPONSE CODE


app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/search", (req, res) => {
  res.render("search");
})

// GET USER ID

const getUser = (req, res) => {
  const cookie = req.session["user_id"];
  const user = users[cookie];
  return user;
};

// SEARCH PAGE

app.get("/search", (req, res) => {
  const userId = req.session["user_id"];
  const user = users[userId];
  if (user) {
    let templateVars = { user: user };
    res.render("search", templateVars);
  } else {
    res.redirect("/login");
  }
});

// RENDERING URLS ID PAGE

app.get("/index/:search/", (req, res) => {
  const userId = req.session["user_id"];
  const user = users[userId];
  const urlName = urlDatabase[req.params.shortURL];
  if (user.id === urlName.userID) {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL].longURL, user: user, orgUser: urlDatabase[req.params.shortURL].userID};
  res.render("search", templateVars);
  } else {
    res.send("This doesn't appear to be your list!");
  }
});

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`ListIt, listening on port ${PORT}!`);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});



////// FUNCTION TO CHECK FOR AN EMAIL IN USERS OBJECT

const checkForEmail = function(email) {
  for (const user in users) {
    if (users.hasOwnProperty(user) && users[user].email === email) {
      return true;
    }
  }
  return false;
};


///// REGISTRATION AND USER CREATION /////

app.post("/register", (req, res) => {

  // error handling

  if (checkForEmail(req.body.email) === true) {
    res.send(400,"400 Error: An account with this email address already exists.");
  }
  if (req.body.email === "" || req.body.password === "") {
    res.send(400, "400 Error: Please make sure all fields are filled out correctly.");

  } else {

    // if all OK, adds a user to the USERS object

    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    let userId = generateRandomString();

    const newUser = {
      id: userId,
      email: req.body.email,
      password: hashedPassword,
    };

    users[userId] = newUser;

    req.session.user_id, users[userId].id;
    res.redirect("/urls");
  }
});


// REDIRECT TO SIGNUP PAGE

app.post("/signup", (req, res) => {
  res.redirect("/register");
});

// ON CLICKING THE LOGIN BUTTON ON THE LOGIN PAGE

app.post("/login", (req, res) => {

  // WILL NEED TO ADD AUTO-LOGIN - Check notes

  // const user = getUserByEmail(req.body.email, users);

  // if (!user) {
  //   res.send(400, "Error: Username/password combination not found.");
  // } else {

  //   const email = user.email;
  //   const password = user.password;

  //   if (user && bcrypt.compareSync(req.body.password, password)) {
  //     req.session.user_id = user.id;
  //   } else res.send(400, "400 Error: Username/password combination not found.");
  //   let templateVars = { urls: urlDatabase, user: user, email: email, password: password};

  //   res.redirect("/index");
  }
});


// LOGOUT

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/urls");
});



// FUNCTION: FILTER URLS BY USER

const urlsForUser = function(id) {
  let urls = { };
  for (const key in urlDatabase) {
    if (id === urlDatabase[key].userID) {
      urls[key] = urlDatabase[key];
    }
  } return urls;
};


// INDEX PAGE


app.get("/search", (req, res) => {
  const userId = req.session["user_id"];
  const user = users[userId];
  let searches = userSearches(userId);
  let templateVars = { listItems: listItems, user: user};
  res.render("search", templateVars,);
});


// // SHOW URLS

// app.get("/urls/:shortURL", (req, res) => {
//   const userId = req.session["user_id"];
//   const user = users[userId];
//   let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL].longURL, user: user};
//   res.render("urls_show", templateVars);
// });


// REDIRECT TO LOGIN PAGE

// app.get("/", (req, res) => {
//   const user = getUser(req, res);
//   if (user) {
//     res.redirect("/urls");
//   } else
//     res.redirect("/login");
// });


// GET SHORTENED URL

// app.post("/urls", (req, res) => {
//   let shortenedURL = generateRandomString();
//   for (let uID in users) {
//     let value = users[uID];

//     urlDatabase[shortenedURL] = {
//       longURL : req.body.longURL,
//       userID : value.id
//     };
//   }
//   res.redirect(`/urls/${shortenedURL}`);
// });

// REDIRECT TO LONG URL PAGE

// app.get("/u/:shortURL", (req, res) => {
//   let longURL = urlDatabase[req.params.shortURL].longURL;
//   res.redirect(longURL);
// });

// CHECK OFF A TO-DO ITEM

app.post("/myList/:todoItem/setDone", (req, res) => {
  listDatabase[req.params.todoItem].active = false;
  res.redirect("/myList");
});

// EDIT A SHORT URL

app.post("/urls/:shortURL", (req, res) => {
  urlDatabase[req.params.shortURL].longURL = req.body.longURL;
  res.redirect("/urls");
});






// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)

request.onload = function() {
  // Begin accessing JSON data here
}

// Send request
request.send()

var data = JSON.parse(this.response)

data.forEach(movie => {
  // Log each movie's title
  console.log(movie.title)
})

