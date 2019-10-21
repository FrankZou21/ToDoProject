-- USERS

INSERT INTO users (id, username, first_name, profile_pic) VALUES (1, 'AnthonyB', 'Anthony','https://void.to/uploads/avatars/avatar_31329.jpg');

INSERT INTO users (id, username, first_name, profile_pic) VALUES (2, 'FrankZ', 'Frank','https://void.to/uploads/avatars/avatar_31329.jpg');

INSERT INTO users (id, username, first_name, profile_pic) VALUES (3, 'AnneF', 'Anne','https://void.to/uploads/avatars/avatar_31329.jpg');

INSERT INTO users (id, username, first_name, profile_pic) VALUES (4, 'TravisB', 'Travis','https://void.to/uploads/avatars/avatar_31329.jpg');


-- ACTORS
INSERT INTO actors (id, names) VALUES (1, 'Brad Pitt');

-- FILMS
INSERT INTO films (title, poster_img, imdb_rating, genre, actor_id, user_id) VALUES ('Avatar', 'https://void.to/uploads/avatars/avatar_31329.jpg', 4, 'space-fantasy', 1, 1);

-- BOOKS
INSERT INTO books (title, author, rating, page_count, user_id) VALUES ('Thinking Fast & Slow', 'Daniel Kahneman', 5, 488,1);

-- PRODUCTS
INSERT INTO products (product_name, brand, price, user_id) VALUES ('iPod', 'Apple', 1000,1);

-- RESTAURANTS
INSERT INTO restaurants (name, phone_number, image_url, rating, type_of_food, address, user_id) VALUES ('Tojo', '6047685463', 'https://void.to/uploads/avatars/avatar_31329.jpg', 4, 'Japanese','1133 W Broadway', 1);



