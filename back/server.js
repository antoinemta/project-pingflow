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
    let db = new sqlite3.Database("./findyourcountry.db");
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
                socket.emit("recupToken", res, data);
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
    let response = {
      display: [false, false, false],
      textColor: "",
      message: ""
    };

    let db = new sqlite3.Database("./findyourcountry.db");
    db.all(
      `SELECT pseudonyme FROM users WHERE pseudonyme='${res.pseudonyme}'`,
      (err, rows) => {
        if (err) {
          return false;
        } else {
          if (rows.length >= 1) {
            response.display[0] = true;
            socket.emit("responseInsert", response);
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
  });

  socket.on("addCountry", resp => {
    let res = resp[resp.length - 1];
    let db = new sqlite3.Database("./findyourcountry.db");
    db.run(
      `INSERT INTO favorites (token, country, flag, capital, continent, money, population, lat, lng) VALUES ('${
        res.token
      }','${res.country}', '${res.flag}','${res.capital}','${res.continent}','${
        res.money
      }','${res.population}','${res.lat}','${res.lng}')`,
      err => {
        if (err) {
          return false;
        } else {
          socket.emit("recupToken", res.token, resp);
        }
      }
    );
    db.close();
  });

  socket.on("deleteCountry", (country, favorites, token) => {
    let db = new sqlite3.Database("./findyourcountry.db");
    const supp = favorites.filter(name => name.country != country);

    db.run(
      `DELETE FROM favorites WHERE token='${token}' AND country='${country}'`,
      err => {
        if (err) {
          return false;
        } else {
          socket.emit("recupToken", token, supp);
        }
      }
    );
    db.close();
  });

  socket.on("login", res => {
    let db = new sqlite3.Database("./findyourcountry.db");
    let response = {
      inputPseu: false,
      inputPass: false
    };
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
              db.all(
                `SELECT country, flag, capital, continent, money, population, lat, lng FROM favorites WHERE token='${
                  rows[0].token
                }'`,
                (err, data) => {
                  if (err) {
                    return false;
                  } else {
                    socket.emit("recupToken", rows[0].token, data);
                  }
                }
              );
            } else {
              response.inputPass = true;
              socket.emit("falseLog", response);
            }
          } else {
            response.inputPseu = true;
            socket.emit("falseLog", response);
          }
        }
      }
    );

    db.close();
  });
});

server.listen(8081);
