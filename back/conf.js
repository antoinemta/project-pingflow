const sql = require('sqlite3');

const connection = sql.createConnection({
  host: 'localhost',
  database: 'enjoy'
});

const saltRounds = 10;

const jwtSecret = 'YOUR SECRET';

const PORT_NUMBER = 'YOUR PORT NUMBER';

module.exports = {
  jwtSecret,
  DBurl,
  saltRounds,
  PORT_NUMBER,
  connection
};
