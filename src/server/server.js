/* eslint no-console:off */

const http   = require('http');
const _404   = require('./_404');
const pages  = require('./pages');

const {
  ssl,
  httpsOnly
} = require('./ssl');

const MiddleWare   = require('./middleware');
const StaticServer = require('./static');

const staticServer = new StaticServer();
const app          = new MiddleWare(); 

function start (port) {

  return new Promise ((resolve, reject) => {

    console.log ('Starting server');

    try {
      // if production deployment, only allow https connections
      // ===> N.B. not sure this ever executes
      if (process.env.NODE_ENV === 'production') {
        httpsOnly(app);
      }

      pages(app)
        .then( () => staticServer.install(app) )
        .then( () => _404(app) )
        .then( () => startApp(app,port,resolve) )
        .catch( err => {
          console.log( 'BOOT ERROR (1)', err );
        });

    } catch (err)  {
      console.log( 'BOOT ERROR (2)', err );
      reject (err);
    }
  });
}

function startApp(app,port,resolve) {

  var listening = (_port) => {
    return () => {
      console.log (`Server listening on port ${_port}`);
      port === _port && resolve ();
    };
  };

  try {
    ssl(app, listening);
  } catch(err) {
    console.log( 'wups catch: ' + err );
  }

  http.createServer(app.handler).listen(port,listening(port));
}

exports.start = start;
