//setup
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded( { extended: true }));
app.use(bodyParser.json());
//env
const port = process.env.PORT || 5000;

let db_url = '';

if(process.env.ENV === 'Test') {
  console.log('Test db');
  db_url = process.env.DB_URL + "/api-test";
} else {
  console.log('Actual db');
  db_url = process.env.DB_URL;
}

//db connection
mongoose.connect(db_url, {useUnifiedTopology: true, useNewUrlParser: true});
//db instance
const db = mongoose.connection
db.on('error', (error) => console.log('error: ' + error));
db.once('open', () => console.log('connected to database'));

//models
const User = require('./models/userModel');
const Game = require('./models/gameModel');
//routers
const userRouter = require('./routes/users')(User);
const gameRouter = require('./routes/games')(Game);
//use user router in api
app.use('/api/users', userRouter);
app.use('/api/games', gameRouter);
//get
app.get('/', (req, res) => {
  res.send('welcome to the api');
});

//have api listen on port
app.server = app.listen(port, () => {
  console.log(`api up and running on ${port}`);
});

module.exports = app;
