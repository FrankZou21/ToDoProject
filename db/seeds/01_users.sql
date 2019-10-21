-- USERS

INSERT INTO users (id, username, password, first_name, profile_pic) VALUES (1, 'AnthonyB', '12345', 'Anthony','https://void.to/uploads/avatars/avatar_31329.jpg');

INSERT INTO users (id, username, password, first_name, profile_pic) VALUES (2, 'FrankZ', '12345', 'Frank','https://void.to/uploads/avatars/avatar_31329.jpg');

INSERT INTO users (id, username, password, first_name, profile_pic) VALUES (3, 'AnneF', '12345', 'Anne','https://void.to/uploads/avatars/avatar_31329.jpg');

INSERT INTO users (id, username, password, first_name, profile_pic) VALUES (4, 'TravisB', '12345', 'Travis','https://void.to/uploads/avatars/avatar_31329.jpg');


-- ACTORS
INSERT INTO actors (id, names) VALUES (1, 'Brad Pitt');

-- FILMS
INSERT INTO films (title, poster_img, imdb_rating, genre, actor_id, user_id) VALUES ('Avatar', 'https://void.to/uploads/avatars/avatar_31329.jpg', 4, 'space-fantasy', 1, 1);

-- BOOKS
INSERT INTO books (title, author, rating, page_count, user_id) VALUES ('Thinking Fast & Slow', 'Daniel Kahneman', 5, 488,1);

-- PRODUCTS
INSERT INTO products (product_name, price, picture, user_id) VALUES ('iPod', 1000, 'https://item.rakuten.co.jp/machida/xr_64gb_simfree_new/', 1);

-- RESTAURANTS
INSERT INTO restaurants (name, phone_number, image_url, rating, type_of_food, address, url, user_id) VALUES ('Tojo', '6047685463', 'https://void.to/uploads/avatars/avatar_31329.jpg', 4, 'Japanese','1133 W Broadway','"https://www.yelp.com/biz/blue-water-cafe-vancouver?adjust_creative=54XKGwcXQpUVJbMov60XBw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=54XKGwcXQpUVJbMov60XBw"', 1);



