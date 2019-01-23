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
  socket.on("checkingToken", res => {
    let db = new sqlite3.Database("./findyourcountry.db");
    db.all(`SELECT token FROM users WHERE token='${res}'`, (err, rows) => {
      if (!err) {
        if (rows.length == 1) {
          db.all(
            `SELECT country, flag, capital, continent, money, population, lat, lng FROM favorites WHERE token='${res}'`,
            (err, data) => {
              if (!err) {
                socket.emit("log", res, data);
              }
            }
          );
        }
      }
    });
    db.close();
    return true;
  });

  socket.on("countrySearched", res => {
    axios({
      method: "get",
      url: `https://restcountries.eu/rest/v2/name/${res}`
    })
      .then(resApi => {
        socket.emit("resApi", resApi.data);
        return true;
      })
      .catch(() => {
        return false;
      });
  });

  socket.on("sendLog", res => {
    let response = {
      display: [false, false, false],
      textColor: "",
      message: ""
    };

    let db = new sqlite3.Database("./findyourcountry.db");
    db.all(
      `SELECT pseudonyme FROM users WHERE pseudonyme='${res.pseudonyme}'`,
      (err, rows) => {
        if (!err) {
          if (rows.length >= 1) {
            response.display[0] = true;
            socket.emit("responseInsert", response);
          } else {
            db.run(
              `INSERT INTO users (pseudonyme, password, token) VALUES ('${
                res.pseudonyme
              }','${res.password}', '${randtoken(16)}')`,
              err => {
                if (!err) {
                  response.display[2] = true;
                  response.message = "You have been registred !";
                  response.textColor = "text-success";
                  socket.emit("responseInsert", response);
                }
              }
            );
          }
        }
      }
    );
    db.close();
    return true;
  });

  socket.on("addCountry", resp => {
    let res = resp[resp.length - 1];
    let db = new sqlite3.Database("./findyourcountry.db");
    db.run(
      `INSERT INTO favorites (token, country, flag, capital, continent, money, population, lat, lng, comment) VALUES ('${
        res.token
      }','${res.country}', '${res.flag}','${res.capital}','${res.continent}','${
        res.money
      }','${res.population}','${res.lat}','${res.lng}','etrher')`,
      err => {
        if (!err) {
          socket.emit("log", res.token, resp);
        }
      }
    );
    db.close();
    return true;
  });

  socket.on("deleteCountry", (country, favorites, token) => {
    let db = new sqlite3.Database("./findyourcountry.db");
    const supp = favorites.filter(name => name.country != country);

    db.run(
      `DELETE FROM favorites WHERE token='${token}' AND country='${country}'`,
      err => {
        if (!err) {
          socket.emit("log", token, supp);
        }
      }
    );
    db.close();
    return true;
  });

  socket.on("modifComment", (comment, country, token) => {
    let db = new sqlite3.Database("./findyourcountry.db");
    db.run(
      `UPDATE favorites SET comment='${comment}' WHERE token='${token}' AND country='${country}'`,
      err => {
        if (err) {
          db.close();
          return false;
        } else {
          db.close();
          return true;
        }
      }
    );
  });

  socket.on("fetchCountry", (country, token) => {
    let db = new sqlite3.Database("./findyourcountry.db");

    db.all(
      `SELECT country, flag, capital, continent, money, population, lat, lng, comment FROM favorites WHERE token='${token}' AND country='${country}'`,
      (err, data) => {
        if (!err) {
          socket.emit("recupFetch", data);
        }
      }
    );
    db.close();
    return true;
  });

  socket.on("login", res => {
    let db = new sqlite3.Database("./findyourcountry.db");
    let response = {
      inputPseudo: false,
      inputPass: false
    };
    db.all(
      `SELECT pseudonyme, password, token FROM users WHERE pseudonyme='${
        res.pseudonyme
      }'`,
      (err, rows) => {
        if (!err) {
          if (rows.length == 1) {
            if (rows[0].password == res.password) {
              db.all(
                `SELECT country, flag, capital, continent, money, population, lat, lng FROM favorites WHERE token='${
                  rows[0].token
                }'`,
                (err, data) => {
                  if (!err) {
                    socket.emit("log", rows[0].token, data);
                  }
                }
              );
            } else {
              response.inputPass = true;
              socket.emit("falseLog", response);
            }
          } else {
            response.inputPseudo = true;
            socket.emit("falseLog", response);
          }
        }
      }
    );
    db.close();
    return true;
  });
});

server.listen(8081);
