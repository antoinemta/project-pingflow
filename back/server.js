const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io").listen(server);
const axios = require("axios");
var randtoken = require("rand-token").uid;
var sqlite3 = require("sqlite3").verbose();

io.sockets.on("connection", socket => {
  console.log("connected");

  socket.on("check", res => {
    var db = new sqlite3.Database("./findyourcountry.db");
    db.all(`SELECT token FROM users WHERE token='${res}'`, (err, rows) => {
      if (err) {
        return false;
      } else {
        if (rows.length == 1) {
          db.all(
            `SELECT country, flag, capital, continent, money, population, lat, lng FROM favorites WHERE token='${res}'`,
            (err, data) => {
              if (err) {
                return false;
              } else {
                socket.emit("recupToken", data);
              }
            }
          );
        } else {
          return false;
        }
      }
    });

    db.close();
  });

  socket.on("countrySearched", res => {
    axios({
      method: "get",
      url: `https://restcountries.eu/rest/v2/name/${res}`
    })
      .then(resApi => {
        socket.emit("resApi", resApi.data);
      })
      .catch(() => {
        return false;
      });
  });
  socket.on("sendLog", res => {
    var db = new sqlite3.Database("./findyourcountry.db");
    db.all(
      `SELECT pseudonyme FROM users WHERE pseudonyme='${res.pseudonyme}'`,
      (err, rows) => {
        if (err) {
          return false;
        } else {
          if (rows.length >= 1) {
            console.log("deja pris");
            return false;
          } else {
            db.run(
              `INSERT INTO users (pseudonyme, password, token) VALUES ('${
                res.pseudonyme
              }','${res.password}', '${randtoken(16)}')`,
              err => {
                if (err) {
                  return false;
                } else {
                  console.log("enregistré!");
                }
              }
            );
          }
        }
      }
    );

    db.close();
  });

  socket.on("login", res => {
    var db = new sqlite3.Database("./findyourcountry.db");
    db.all(
      `SELECT pseudonyme, password, token FROM users WHERE pseudonyme='${
        res.pseudonyme
      }'`,
      (err, rows) => {
        if (err) {
          return false;
        } else {
          if (rows.length == 1) {
            if (rows[0].password == res.password) {
              console.log("okay");
            } else {
              console.log("mdp errone");
            }
          } else {
            console.log("pas trouve");
          }
        }
      }
    );

    db.close();
  });
});

server.listen(8081);
