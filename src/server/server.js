/* eslint no-console:off */
// const express        = require ('express');
// const bodyParser     = require ('body-parser');
// const cookieParser   = require ('cookie-parser');
// const expressSession = require ('express-session');

const fs             = require ('fs');
const path           = require ('path');
const https          = require('https');
const http           = require('http');

const routes     = require ('./routes');

const sslPath    = '/etc/letsencrypt/live/movementvote.org/';
const SSL_PORT   = 4000;
const PUBLIC_DIR = path.join(__dirname, '../public');

const MiddleWare   = require('./MiddleWare');
const StaticServer = require('./static');

const staticServer = new StaticServer();
const app = new MiddleWare(); // express ();


// ensure HTTPS is used for all interactions
const httpsOnly = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
    res.setStatusCode = 302;
    res.setHeader( 'Location', ['https://', req.hostname, req.url].join ('') );
    return;
  } else {
    return next ();
  }
};

function start (port) {

  return new Promise ((resolve, reject) => {

    console.log ('Starting server');

    try {
      // if production deployment, only allow https connections
      // ===> N.B. I don't sure this ever executes
      if (process.env.NODE_ENV === 'production') {
        app.use (httpsOnly);
      }

      routes(app)
        .then( () => staticServer.install(PUBLIC_DIR, app) )
        .then( () => startApp(app,port,resolve) );

    } catch (err)  {
      console.log( 'BOOT ERROR', err );
      reject (err);
    }
  });
}

function startApp(app,port,resolve) {

  var listening = (port) => {
    return () => {
      console.log (`Server listening on port ${port}`);
      resolve ();
    };
  };

  try {
    /*
      IMPORTANT NOTES:
       - Congratulations! Your certificate and chain have been saved at
         /etc/letsencrypt/live/movementvote.org/fullchain.pem. Your cert
         will expire on 2017-03-18. To obtain a new or tweaked version of
         this certificate in the future, simply run certbot-auto again. To
         non-interactively renew *all* of your certificates, run
         "certbot-auto renew"
       - If you lose your account credentials, you can recover through
         e-mails sent to victor.stone@gmail.com.
       - Your account credentials have been saved in your Certbot
         configuration directory at /etc/letsencrypt. You should make a
         secure backup of this folder now. This configuration directory will
         also contain certificates and private keys obtained by Certbot so
         making regular backups of this folder is ideal.
       - If you like Certbot, please consider supporting our work by:

         Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
         Donating to EFF:                    https://eff.org/donate-le
    */
      if( fs.statSync(sslPath).isDirectory() ) {
        var options = {
            key: fs.readFileSync(sslPath + 'privkey.pem'),
            cert: fs.readFileSync(sslPath + 'fullchain.pem')
        };
        https.createServer(options, app.handler).listen(SSL_PORT,listening(SSL_PORT));
      }
  } catch(err) {
    console.log( 'wups catch: ' + err );
  }

  http.createServer(app.handler).listen(port,listening(port));
}

exports.start = start;
