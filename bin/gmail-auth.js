/* eslint no-console:"off" */
var fs = require('fs');
var readline = require('readline');
var GMail = require('../src/server/gmail');

var SCOPES = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.send'
];

class AuthFetcher extends GMail {
  onNoAuthTokenFound() {
    var client = this._oauth2Client;
    return new Promise( (resolve,reject) => {
      var authUrl = this._oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
      });
      console.log('Authorize this app by visiting this url: \n\n', authUrl, '\n\n');
      var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question('Enter the code from that page here: ', code => {
        rl.close();
        client.getToken(code, function(err, credentials) {
          err && reject(err);
          !err && resolve(storeToken(Object.assign(client,{credentials})));
        });
      });    
    });
  }
}

const storeToken = client => new Promise( (resolve,reject) => {
  try {
    fs.mkdirSync(GMail.TOKEN_DIR);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      return reject(err);
    }
  }
  fs.writeFile(GMail.TOKEN_PATH, JSON.stringify(client.credentials));
  console.log('Token stored to ' + GMail.TOKEN_PATH);
  return client;
});


var mailer = new AuthFetcher();

const mailTo = process.argv && process.argv[2];

if( mailTo ) {

  const email1 = {
    to:      mailTo,
    subject: 'Hello from node',
    message: 'Test sending email: ' + Date.now()
  };

  const email2 = {
    to:      mailTo,
    subject: 'Hello from node (2)',
    message: 'Test sending email: ' + Date.now()
  };

  Promise.all([
      mailer.send( email1 ).then( resp => console.log( 'response for email1', resp ) ),
      mailer.send( email2 ).then( resp => console.log( 'response for email2', resp ) )
  ]).catch( err => console.log( 'error:', err ) );

} else {

  mailer.authorize()
    .then( () => console.log( 'GMail class is ready to use '))
    .catch( err => console.log( 'error:', err ) );

}

