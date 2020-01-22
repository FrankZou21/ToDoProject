## ToDo List

To-Do List is a multi-page full stack web app that allows the user to register, login
and update a To-Do list based on four categories - places to eat, products to buy,
􀂁lms to watch, and books to read. The app makes use of 4 di􀁽erent API's to access
information on the search parameter provided by the user to update the correct
category on the list.


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x

### Screenshots

!["Login Page"](https://github.com/FrankZou21/ToDoProject/blob/master/docs/Login.png?raw=true)

!["Front Page"](https://github.com/FrankZou21/ToDoProject/blob/master/docs/Main_Page.png?raw=true)

!["Search Result Page"](https://github.com/FrankZou21/ToDoProject/blob/master/docs/Search.png?raw=true)

!["Updated Front Page"](https://github.com/FrankZou21/ToDoProject/blob/master/docs/Result.png?raw=true)
