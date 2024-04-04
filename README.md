# P2P-Book-Exchange-Backend

## Setup instructions
### App
The first thing to do is run
```
npm install
```
### Database
The project has been developed with `postgresql` and `Sequelize`. So all you need is a `postgresql` user and specify its username and password on a `.env` file that you have to create, following the `template.env`. For the `DB_NAME` and `JWT_SECRET` you can put whatever string you want.

After that you can run
```
npx sequelize-cli db:create
```
To create the database

```
npx sequelize-cli db:migrate
```

To run the migrations

And

```
npx sequelize-cli db:seed:all
```

If you want to have some simple seeds.

### App
Finally you can just run the app (API)
```
npm start
```

## Overview of the project
The project is a REST API platform without a frontend developed with `express.js`. So, for now, it is quite centered on functionality. You can see the [API documentation](https://www.postman.com/cloudy-robot-982791/workspace/p2p-book-exchange).

## Key features
* User Profiles
* Book Listings and Search facilitating the exchange of books

## Decisions
* For now there are just 2 models: User and Book
* The idea for exchaging for now is quite simple and straightforward. Without needing to login, with an endpoint you can get the list of all the books (or filter) that other users have created. Along with the books is the email of the owner, so you can communicate directly with him if you are interested on any of the books that he published.
* Then, if you want to publish a book, you have to register and login so your email can be showed in the books you publish. Technically, this is managed with bcrypt and json web tokens. Also, as a user you have a little endpoint for your profile.
* There are endpoints to check the books that you, as a user, have published, and also to delete any of them.

## Project plan for future extension
1. Develop of a frontend so the project can get to more people and give a better user experience
2. More development on the exchange mechanism so it can be done directly on the app. For this I think it could be a good idea to create a ExchangeProposal model so the users can show interest on the books, and if 2 users give each other exchange proposals (kind of a match) automaticaly open a chat for the users to carry out the exchange
3. Develop forums in the app so the community can share any thoughts on the reading field
4. Develop publications so the users can create events to meet up with other users, creating community and a great opportunity to carry out a big ammount of exchanges at once
5. Develop a Q&A AI to recommend the users, based on their preferences, the books that are published on the app