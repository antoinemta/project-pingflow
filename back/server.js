const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const passport = require('passport');
const cors = require('cors');
const PORT_SERVER = 8080;
require('./passport-strategy');
const {
  PORT_NUMBER,
  DBurl,
  Database,
  saltRounds,
  connection,
  client_id,
  client_secret
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

app.post('/informationsCity', (req, res) => {
  let capital = req.body.capital;
  let infosCity = undefined;
  request(
    {
      url: 'https://api.foursquare.com/v2/venues/explore',
      method: 'GET',
      qs: {
        client_id: `${client_id}`,
        client_secret: `${client_secret}`,
        near: `${capital}`,
        query: 'monuments',
        v: '20180323',
        limit: 10
      }
    },
    (err, response, body) => {
      if (err) {
        console.error(err);
      } else {
        infosCity = JSON.parse(body).response.groups;
        console.log(infosCity);
        res.status(200).send(infosCity);
      }
    }
  );
});

app.listen(PORT_NUMBER, () => {
  console.log(`listening on port ${PORT_NUMBER}`);
});
