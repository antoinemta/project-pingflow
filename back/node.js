var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./findyourcountry.db");

/*db.run(
  "CREATE TABLE favorites (token VARCHAR(16), country VARCHAR(90), flag VARCHAR(60), capital VARCHAR(90), continent VARCHAR(90), money VARCHAR(60), population INT, lat INT, lng INT)"
);*/

/*
db.serialize(function() {
  db.run(`INSERT INTO users (pseudonyme, password) VALUES ('ok','ok')`);
});
*/

db.run("DELETE FROM favorites", err => {});
db.run("DELETE FROM users", err => {});

/*
db.each(
  "SELECT rowid, token, country, flag, capital, continent, money, population, lat, lng FROM favorites",
  (err, row) => {
    console.log(
      row.rowid + " " + row.token + " " + row.country + " " + row.capital
    );
  }
);*/

db.close();
