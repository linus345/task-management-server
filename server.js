const express = require('express');
const app = express();
const mongoose = require('mongoose');
const seed = require('./config/seed');

require('dotenv').config();

// connect to the database
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

// check if the connection was successful or not
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Connected to database');
  // seed the database with users, boards and tasks
  // seed.users(seed.boards);
  // seed the database with only users
  // seed.users();
  // seed the database with only boards and tasks
  // seed.boards();
});

// middleware
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'content-type, authorization');
  next();
});

app.use(express.json());


const middleware = require('./middleware/middleware');

// require and use all the routes
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const boardRoutes = require('./routes/board');

app.use('/', indexRoutes);
app.use('/', middleware.isAuthenticated, userRoutes);
// task routes are in the board routes file because
// the board id is needed to create a task so it makes
// more sense to have them together
app.use('/boards', middleware.isAuthenticated, boardRoutes);

// listen for requests on localhost:4000
app.listen(4000, () => {
  console.log('Listening on localhost:4000...');
});