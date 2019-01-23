var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./findyourcountry.db");

/*db.run(
  "CREATE TABLE users (pseudonyme VARCHAR(60), password VARCHAR(60), token VARCHAR(16))"
);*/

/*
db.serialize(function() {
  db.run(`INSERT INTO users (pseudonyme, password) VALUES ('ok','ok')`);
});*/

/*
//db.run("DELETE FROM favorites", err => {});
//db.run("DELETE FROM users", err => {});*/

//db.run("DROP TABLE favorites", err => {});
/*//db.run("DROP TABLE users", err => {});

*/
/*
db.each("SELECT pseudonyme, password, token FROM users", (err, row) => {
  console.log(row.pseudonyme + " " + row.password);
});
*/

db.run(
  "CREATE TABLE favorites (token VARCHAR(16), country VARCHAR(90), flag VARCHAR(60), capital VARCHAR(90), continent VARCHAR(90), money VARCHAR(60), population INT, lat INT, lng INT, comment TEXT)"
);

/*db.serialize(function() {
  db.run(`INSERT INTO favorites (token) VALUES ('ok')`);
});*/

db.close();
