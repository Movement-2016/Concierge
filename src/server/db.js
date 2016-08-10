const mongoClient = require ('mongodb').MongoClient;
const ObjectId = require ('mongodb').ObjectId;
const hash = require ('./hash');

let db = null;
let users = null;
let plans = null;

// connect to database and set up collections
function init (uri) {
  console.log ('db.init');
  return new Promise ((resolve, reject) => {
    if (db === null) {
      mongoClient.connect (uri, (err, instance) => {
        if (err) {
          console.log ('init err:', err);
          reject (err);
        } else {
          db = instance;
          Promise.resolve ().then (() => {
            users = db.collection ('users');
            return users.ensureIndex ({ username: 1 }, { unique: true });
          }).then (() => {
            plans = db.collection ('plans');
          }).then (() => {
            resolve ();
          }).catch (err2 => {
            reject (err2);
          });
        }
      });
    } else {
      resolve ();
    }
  });
}

// Close database and null out references
function close () {
  return new Promise ((resolve) => {
    if (db) {
      users = null;
      plans = null;
      Promise.resolve ().then (() => {
        return db.close ();
      }).then (() => {
        db = null;
        resolve ();
      }).catch (() => {
        db = null;
        resolve ();
      });
    } else {
      resolve ();
    }
  });
}

// Find single user by user name
function findUserByUsername (username) {
  return users.findOne ({ username });
}

// Insert single user with username, password only populated. Suitable for
// register user type functions.
function insertUser (username, password) {
  return new Promise ((resolve, reject) => {
    Promise.resolve ().then (() => {
      return findUserByUsername (username);
    }).then (result => {
      if (result !== null) {
        return reject (new Error ('User already exists'));
      }
      const userHash = hash.create (password);
      const user = {
        username,
        hash: userHash.hash,
        salt: userHash.salt,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        favorites: [],
        donations: [],
      };
      return users.insert (user, { w: 1 });
    }).then (result => {
      resolve (result);
    }).catch (err => {
      reject (err);
    });
  });
}

// Update user information (not username or password).
function updateUser (username, firstName, lastName, email, phone, favorites, donations) {
  return users.update (
    { username },
    { $set: {
      firstName,
      lastName,
      email,
      phone,
      favorites,
      donations,
    } }
  );
}

// remove user by username
function removeUser (username) {
  return users.remove ({ username });
}

// get a single plan
function getPlan (_id) {
  return plans.findOne ({ _id: new ObjectId (_id) });
}

// insert a plan
function insertPlan (newPlan) {
  return plans.insert (newPlan, { w: 1 });
}

// update a plan
function updatePlan (_id, category, title, author, text, cover) {
  return plans.update (
    { _id: new ObjectId (_id) },
    { $set: {
      category,
      title,
      author,
      text,
      cover,
    } }
  );
}

function getData () {
  return users.find ({}).toArray ();
}

exports.init = init;
exports.close = close;
exports.findUserByUsername = findUserByUsername;
exports.insertUser = insertUser;
exports.updateUser = updateUser;
exports.removeUser = removeUser;
exports.getPlan = getPlan;
exports.insertPlan = insertPlan;
exports.updatePlan = updatePlan;
exports.getData = getData;
