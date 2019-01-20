const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io").listen(server);
const axios = require("axios");

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
      .catch(error => {
        console.log(error);
      });
  });
});

server.listen(8081);
