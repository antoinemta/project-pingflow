const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {
  Strategy: JWTStrategy,
  ExtractJwt: ExtractJWT
} = require("passport-jwt");
const sql = require("sqlite3");
const bcrypt = require("bcrypt");
const { jwtSecret, DBurl, Database } = require("./conf");

let db = undefined;
/*sql.connect(
  DBurl,
  { useNewUrlParser: true },
  (err, client) => {
    if (err) return console.log("There was an error: " + err);
    db = client.db(Database);
  }
);*/

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (username, password, callback) => {
      db.query(
        `SELECT email, password FROM user WHERE email = ${username}`,
        (err, results) => {
          if (err) {
            return callback(null, false, {
              message: `We crashed, here is the message : ${err}`
            });
          }
          const user = results;
          if (user) {
            bcrypt.compare(password, user.password, (errBcrypt, result) => {
              if (result === true) {
                return callback(
                  null,
                  { id: user.id, email: user.email },
                  { message: "Logged In Successfully" }
                );
              }
              return callback(null, false, {
                message: "Incorrect email or password."
              });
            });
          }
          return undefined;
        }
      );
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret
    },
    (jwtPayload, cb) => {
      const user = jwtPayload;
      return cb(null, user);
    }
  )
);
