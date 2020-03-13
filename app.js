// imports
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

const errorController = require('./controllers/error');

const MONGODB_URI = `${process.env.MONGO_URI}`;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();

// Set template engine to ejs, set views directory to views folder
app.set('view engine', 'ejs');
app.set('views', 'views');

const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipe');

// Middleware to parse request body into key:value pairs
app.use(bodyParser.urlencoded({extended: false}));

//Middleware to serve public file statically so css files can be imported
app.use(express.static(path.join(__dirname, 'public')));

//Create Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store
}));

app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(authRoutes);
app.use(recipeRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(process.env.PORT || 3000);
  })
  .catch(error => {
    console.log(error)
  });
