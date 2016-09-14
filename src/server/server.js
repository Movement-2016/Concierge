const express = require ('express');
const bodyParser = require ('body-parser');
const cookieParser = require ('cookie-parser');
const expressSession = require ('express-session');
const fs = require ('fs');
const path = require ('path');
const passport = require ('passport');
const auth = require ('./auth');
const db = require ('./db');
const routes = require ('./routes');

// the secret for the session, should be set in an environment variable
// some random text used as a placeholder for dev
const sessionSecret = process.env.SESSION_SECRET || 'randomtext_yueierp';

// ensure HTTPS is used for all interactions
const httpsOnly = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] &&
    req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect (['https://', req.hostname, req.url].join (''));
  } else {
    return next ();
  }
};

function start (port, dbLocation) {
  return new Promise ((resolve, reject) => {
    console.log ('Starting server');
    Promise.resolve ().then (() => {
      return db.init (dbLocation);
    }).then (() => {
      const app = express ();

      // if production deployment, only allow https connections
      if (process.env.NODE_ENV === 'production') {
        app.use (httpsOnly);
      }

      // set up HTTP parsers and session manager
      app.use (cookieParser ());
      app.use (bodyParser.json ());
      app.use (bodyParser.urlencoded ({ extended: true }));
      app.use (expressSession ({
        secret: sessionSecret,
        saveUninitialized: true,
        resave: true,
      }));

      // set up passport authentication, attach to express session manager
      auth.init ();
      app.use (passport.initialize ());
      app.use (passport.session ());

      // create server with HTML and REST routes
      routes.init (app);

        console.log ('back from routes');

      // handle zipped javascript content
      app.get ('*.js', (req, res) => {
        const file = path.join (__dirname, `public${req.path}.gz`);
        if (fs.existsSync (file)) {
          res.set ({
            'content-type': 'text/javascript',
            'content-encoding': 'gzip',
          });
          res.sendFile (file);
        } else {
          res.set ({
            'content-type': 'text/javascript',
          });
          res.sendFile (path.join (__dirname, `public${req.path}`));
        }
      });

      // static file handling
      app.use (express.static (path.join (__dirname, 'public')));

      // for not explicitly handled HTML routes, return root document
      app.use ('*', (req, res) => {
        res.sendFile (path.join (__dirname, 'public/index.html'));
      });

      app.listen (port, () => {
        console.log (`Server listening on port ${port}`);
        resolve ();
      });
    }).catch (err => {
      reject (err);
    });
  });
}

exports.start = start;
