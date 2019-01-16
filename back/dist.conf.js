const sql = require('sqlite3');

const connection = sql.createConnection({
  host: 'localhost',
  database: 'enjoy'
});

const saltRounds = 10;

const jwtSecret = 'YOUR SECRET';

const PORT_NUMBER = 'YOUR PORT NUMBER';

const client_id = '';

const client_secret = '';

module.exports = {
  jwtSecret,
  DBurl,
  saltRounds,
  PORT_NUMBER,
  connection,
  client_id,
  client_secret
};