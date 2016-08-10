/* eslint prefer-arrow-callback: off */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const request = require ('request');
const url = require ('./test-main').url;

describe ('page loading', function () {
  describe ('/', function () {
    it ('should return 200 with home page', function (done) {
      request.get (url, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          if (body.indexOf ('<title>Movement 2016</title>') !== -1) {
            return done ();
          } else {
            return (done (new Error ('Invalid body', body)));
          }
        }
        return done (new Error ('Invalid response', res.statusCode));
      });
    });
  });

  describe ('invalid URL content', function () {
    it ('should return 200 with home page', function (done) {
      request.get (`${url}dummy`, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          if (body.indexOf ('<title>Movement 2016</title>') !== -1) {
            return done ();
          } else {
            return (done (new Error ('Invalid body', body)));
          }
        }
        return done (new Error ('Invalid response', res.statusCode));
      });
    });
  });
});
