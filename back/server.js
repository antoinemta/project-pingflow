const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const passport = require('passport');
const cors = require('cors');
const PORT_SERVER = 8080;
require('./passport-strategy');
const {
  PORT_NUMBER,
  DBurl,
  Database,
  saltRounds,
  connection
} = require('./conf');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/login', require('./routes/login'));

app.all(
  '/*',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    next();
  }
);

app.use(function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.write('you posted:\n');
  res.end(JSON.stringify(req.body, null, 2));
});

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Not found');
});

app.listen(PORT_SERVER, () => {
  console.log(`Listening on port ${PORT_SERVER}... `);
});
