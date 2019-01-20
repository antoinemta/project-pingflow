var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./findyourcountry.db");

//db.run("CREATE TABLE users (pseudonyme VARCHAR(60), password VARCHAR(60), token VARCHAR(16))");

/*
db.serialize(function() {
  db.run(`INSERT INTO users (pseudonyme, password) VALUES ('ok','ok')`);
});
*/

//db.run("DELETE FROM users", err => {});

db.each("SELECT rowid, pseudonyme FROM users", (err, row) => {
  console.log(row.pseudonyme);
});

db.close();
