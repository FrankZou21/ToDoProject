-- DROP TABLES
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS films CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS actors CASCADE;

-- ACTORS
CREATE TABLE actors (
id SERIAL PRIMARY KEY NOT NULL,
names VARCHAR(255) NOT NULL
);

-- USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(25) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  profile_pic VARCHAR(255) NOT NULL
);

-- FILMS -- FINDING VALUES (HARRY POTTER SEARCH EXAMPLE)
CREATE TABLE films (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(50) NOT NULL,
  -- object[0].Title
  poster_img VARCHAR(255) NOT NULL,
  -- object[0].Poster
  imdb_rating INTEGER NOT NULL DEFAULT 0,
  -- object[0].imdbRating
  genre VARCHAR(50) NOT NULL,
  -- object[0].Genre
  actor_id INTEGER REFERENCES actors(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

-- BOOKS
CREATE TABLE books (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(50) NOT NULL,
  -- object[1].items[0].volumeInfo.title
  author VARCHAR(50) NOT NULL,
  -- object[1].items[0].volumeInfo.authors
  rating INTEGER NOT NULL DEFAULT 0,
  -- object[1].items[0].volumeInfo.averageRating
  page_count INTEGER NOT NULL,
  -- object[1].items[0].volumeInfo.pageCount
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

-- PRODUCTS (WAITING TO GET API)
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  brand VARCHAR(50) NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

-- RESTAURANTS -- USEING "TOJO" as an example
CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  -- object[2].businesses[0].name
  phone_number VARCHAR(255) NOT NULL,
  -- object[2].businesses[0].phone OR display_phone
  image_url VARCHAR(255) NOT NULL,
  -- object[2].businesses[0].image_url
  rating INTEGER NOT NULL DEFAULT 0,
  -- object[2].businesses[0].rating
  type_of_food VARCHAR(255) NOT NULL,
  -- object[2].businesses[0].categories[0].alias["japanese"]
  address VARCHAR(255) NOT NULL,
  -- object[2].businesses[0].location.address1["1133 Broadway"]
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);



