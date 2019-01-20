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
                }
              }
            );
          }
        }
      }
    );

    db.close();
  });
});

server.listen(8081);
