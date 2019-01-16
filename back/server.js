const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const passport = require('passport');
const cors = require('cors');
const { PORT_NUMBER, client_id, client_secret } = require('./conf');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('dbMonuments');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/informationsCities', (req, res) => {
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
        infosCity = JSON.parse(body).response;
        console.log(infosCity);
        res.status(200).send(infosCity);
      }
    }
  );
});

app.listen(PORT_NUMBER, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening on port ${PORT_NUMBER}`);
  }
});
