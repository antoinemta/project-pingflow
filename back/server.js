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

app.post('/informationsMonuments', (req, res) => {
  let city = req.body.city;
  let infosMonuments = undefined;
  request(
    {
      url: 'https://api.foursquare.com/v2/venues/explore',
      method: 'GET',
      qs: {
        client_id: `${client_id}`,
        client_secret: `${client_secret}`,
        near: `${city}`,
        query: 'monuments',
        v: '20180323',
        limit: 10
      }
    },
    (err, response, body) => {
      if (err) {
        console.error(err);
      } else {
        infosMonuments = JSON.parse(body).response.groups[0].items;
        console.log(infosMonuments);
        res.status(200).send(infosMonuments);
      }
    }
  );
});

app.get('/PositionCities', (req, res) => {
  let PositionCity = [
    'Paris',
    'Madrid',
    'Tokyo',
    'New-York',
    'Barcelona',
    'London',
    'Moscow',
    'Rome',
    'Brussels',
    'Mexico'
  ];
  let latLong = [];
  PositionCity.map(city => {
    request(
      {
        url: 'https://api.foursquare.com/v2/venues/explore',
        method: 'GET',
        qs: {
          client_id: `${client_id}`,
          client_secret: `${client_secret}`,
          near: `${city}`,
          v: '20180323',
          limit: 1
        }
      },
      (err, response, body) => {
        if (err) {
          console.error(err);
        } else {
          latLong.push({
            lat: JSON.parse(body).response.geocode.center.lat,
            long: JSON.parse(body).response.geocode.center.lng
          });
        }
      }
    );
  });
  res.status(200).send(latLong);
});

app.listen(PORT_NUMBER, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening on port ${PORT_NUMBER}`);
  }
});
