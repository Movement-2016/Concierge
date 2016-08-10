const passport = require ('passport');
const Strategy = require ('passport-local').Strategy;
const db = require ('./db');
const hash = require ('./hash');

// Initialize authentication module, with serializer and desericalizer
function init () {
  // local authentication using database for user registry
  passport.use (new Strategy ((username, password, callback) => {
    db.findUserByUsername (username)
    .then (user => {
      if (!user) {
        return callback (null, false);
      }
      const passwordMatch = hash.compare (password, user.hash, user.salt);
      return callback (null, (passwordMatch) ? user : false);
    })
    .catch (err => {
      return callback (err);
    });
  }));

  // set function to set username as key for serialization
  passport.serializeUser ((user, callback) => {
    callback (null, user.username);
  });

  // set function to get user from username
  passport.deserializeUser ((username, callback) => {
    db.findUserByUsername (username)
    .then (user => {
      return callback (null, user);
    })
    .catch (err => {
      return callback (err);
    });
  });
}

exports.init = init;
