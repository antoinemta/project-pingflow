const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const passport = require('passport');
const cors = require('cors');
const connection = require('./conf');
const PORT_SERVER = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT_SERVER, () => {
  console.log(`Listening on port ${PORT_SERVER}... `);
});
