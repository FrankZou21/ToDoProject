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
  password VARCHAR(25) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  profile_pic VARCHAR(255) NOT NULL DEFAULT 'https://void.to/uploads/avatars/avatar_31329.jpg'
);

-- FILMS -- FINDING VALUES (HARRY POTTER SEARCH EXAMPLE)
CREATE TABLE films (
  id SERIAL PRIMARY KEY NOT NULL,
  film_title VARCHAR(255),
  -- object[0].Title
  poster_img VARCHAR(255),
  -- object[0].Poster
  imdb_rating DECIMAL DEFAULT 0,
  -- object[0].imdbRating
  genre VARCHAR(50),
  -- object[0].Genre
  actor_id INTEGER REFERENCES actors(id) ON DELETE CASCADE,
  user_id_films INTEGER REFERENCES users(id) ON DELETE CASCADE
);

-- BOOKS
CREATE TABLE books (
  id SERIAL PRIMARY KEY NOT NULL,
  book_title VARCHAR(255),
  -- object[1].items[0].volumeInfo.title
  author VARCHAR(50),
  -- object[1].items[0].volumeInfo.authors
  book_rating DECIMAL DEFAULT 0,
  -- object[1].items[0].volumeInfo.averageRating
  page_count INTEGER,
  -- object[1].items[0].volumeInfo.pageCount
  user_id_books INTEGER REFERENCES users(id) ON DELETE CASCADE
);

-- RESTAURANTS -- USEING "TOJO" as an example
CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY NOT NULL,
  restaurant_name VARCHAR(255),
  -- object[2].businesses[0].name
  phone_number VARCHAR(255),
  -- object[2].businesses[0].phone OR display_phone
  image_url VARCHAR(255),
  -- object[2].businesses[0].image_url
  restaurant_rating DECIMAL DEFAULT 0,
  -- object[2].businesses[0].rating
  type_of_food VARCHAR(255),
  -- object[2].businesses[0].categories[0].alias["japanese"]
  address VARCHAR(255),
  -- object[2].businesses[0].location.address1["1133 Broadway"]
  url VARCHAR(255),
  user_id_restaurants INTEGER REFERENCES users(id) ON DELETE CASCADE
);

-- PRODUCTS (WAITING TO GET API)
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  product_name VARCHAR(255),
  -- object[3].Items.itemName
  price INTEGER DEFAULT 0,
  -- object[3].Items.itemPrice
  picture VARCHAR(255),
    -- object[3].Items.itemUrl
  user_id_products INTEGER REFERENCES users(id) ON DELETE CASCADE
);



