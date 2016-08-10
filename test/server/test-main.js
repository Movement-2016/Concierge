/* eslint prefer-arrow-callback: off */
/* eslint global-require: off */
const mongoClient = require ('mongodb').MongoClient;
const server = require ('../../dist/server');
const db = require ('../../dist/db');

const port = 3999;
const url = `http://localhost:${port}/`;
exports.url = url;

const dbURI = 'mongodb://localhost:27017/movement2016Test';

before (function (done) {
  Promise.resolve ().then (() => {
    return resetDatabase ();
  }).then (() => {
    return db.init (dbURI);
  }).then (() => {
    return db.insertUser ('amy', 'test');
  }).then (() => {
    return db.insertUser ('bob', 'test');
  }).then (() => {
    const data = [
      { firstName: 'Amy', lastName: 'Adams', email: 'amy@example.com', phone: '', groups: [] },
    ];
    return db.insertPlan (data);
  }).then (() => {
    return db.close ();
  }).then (() => {
    return server.start (port, dbURI);
  }).then (() => {
    done ();
  }).catch (err => {
    done (err);
  });
});

function resetDatabase () {
  return new Promise ((resolve, reject) => {
    Promise.resolve ().then (() => {
      return mongoClient.connect (dbURI);
    }).then (instance => {
      const users = instance.collection ('users');
      users.ensureIndex ({ username: 1 }, { unique: true })
      .then (() => {
        return users.remove ({});
      }).then (() => {
        const plans = instance.collection ('plans');
        plans.ensureIndex ({ id: 1 }, { unique: true })
        .then (() => {
          return plans.remove ({});
        }).then (() => {
          resolve ();
        }).catch (err => {
          reject (err);
        });
      }).catch (err => {
        reject (err);
      });
    }).catch (err => {
      reject (err);
    });
  });
}

describe ('test-main', function () {
  describe ('test-cmd', function () {
    require ('./test-cmd');
  });
  describe ('test-page', function () {
    require ('./test-page');
  });
  describe ('test-user', function () {
    require ('./test-user');
  });
});
