const express = require("express");
const app = express();
const http = require("http");
const fetch = require("node-fetch");
const port = 8081;
/*const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("dbMonuments");
const bodyParser = require("body-parser");
const request = require("request");
const passport = require("passport");
const cors = require("cors");
require("./passport-strategy");
const {
  PORT_NUMBER,
  //DBurl,
  Database,
  saltRounds,
  //connection,
  client_id,
  client_secret
} = require("./conf");
*/

const server = http.createServer(app);
const io = require("socket.io").listen(server);

io.sockets.on("connection", socket => {
  console.log("connected");

  /* This is the server that calls the API */
  socket.on("fetchCity", res => {
    fetch(`http://api.zippopotam.us/${res.country}/${res.postalCode}`)
      .then(results => results.json())
      .then(data => {
        if (data.places) {
          let dataFront = {
            city: data.places[0]["place name"],
            country: data.country,
            state: data.places[0].state,
            lat: data.places[0].latitude,
            lng: data.places[0].longitude
          };

          socket.emit("fetchCityResponse", dataFront);
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
});

/*
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/informationsMonuments", (req, res) => {
  let city = req.body.city;
  let infosMonuments = undefined;
});

app.use("/login", require("./routes/login"));

app.all(
  "/*",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    next();
  }
);

app.use(function(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.write("you posted:\n");
  res.end(JSON.stringify(req.body, null, 2));
});

app.use((req, res, next) => {
  res.setHeader("Content-Type", "text/plain");
  res.status(404).send("Not found");
});

app.post("/informationsCity", (req, res) => {
  let capital = req.body.capital;
  let infosCity = undefined;

  request(
    {
      url: "https://api.foursquare.com/v2/venues/explore",
      method: "GET",
      qs: {
        client_id: `${client_id}`,
        client_secret: `${client_secret}`,

        near: `${city}`,
        query: "monuments",
        v: "20180323",

        near: `${capital}`,
        query: "monuments",
        v: "20180323",

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

        infosCity = JSON.parse(body).response.groups[0].items;
        console.log(infosCity);
        res.status(200).send(infosCity);
      }
    }
  );
});
*/
server.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening on port ${port}`);
  }
});
