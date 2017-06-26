
/* eslint no-console:off */

const fs         = require ('fs');
const https      = require('https');

const {
  SSL_PATH,
  SSL_PORT,
} = require('./config');


// ensure HTTPS is used for all interactions
const httpsOnlyHandler = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
    res.setStatusCode = 302;
    res.setHeader( 'Location', ['https://', req.hostname, req.url].join ('') );
    return;
  } else {
    return next ();
  }
};


const ssl = (app,listening) => {

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
    if( fs.statSync(SSL_PATH).isDirectory() ) {
      var options = {
          key: fs.readFileSync(SSL_PATH + 'privkey.pem'),
          cert: fs.readFileSync(SSL_PATH + 'fullchain.pem')
      };
      https.createServer(options, app.handler).listen(SSL_PORT,listening(SSL_PORT));
    }
};


module.exports = {
  ssl,
  httpsOnly: app => app.use( '*', httpsOnlyHandler )
};
