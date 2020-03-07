// imports
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

// Set template engine to ejs, set views directory to views folder
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const recipeRoutes = require('./routes/recipe');

// Middleware to parse request body into key:value pairs
app.use(bodyParser.urlencoded({extended: false}));

//Middleware to serve public file statically so css files can be imported
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(recipeRoutes);

app.use(errorController.get404);

app.listen(process.env.PORT || 3000);