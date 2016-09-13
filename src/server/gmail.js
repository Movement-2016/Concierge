/* eslint quotes:"off" */
var fs = require('fs');
var google = require('googleapis');
var googleAuth = require('google-auth-library');


const readJSON = path => new Promise( (resolve,reject) => {
  fs.readFile(path, (err, token) => {
    err && reject(err);
    !err && resolve(JSON.parse(token));
  });
});

const createMessage = ({to, from, subject, message}) => {
    var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", to, "\n",
        "from: ", from, "\n",
        "subject: ", subject, "\n\n",
        message
    ].join('');

    var encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
  return encodedMail;
};

class GMail {

  constructor() {
    this._authorize = this._authorize.bind(this);
  }

  authorize() {
    if( this._oauth2Client && this._oauth2Client.credentials ) {
      return Promise.resolve( this._oauth2Client );
    }
    return readJSON( GMail.CRED_PATH ).then( this._authorize );
  }

  _authorize(credentials) {
    return new Promise( resolve => {

      if( !this._oauth2Client ) {
        const { 
          client_secret, 
          client_id,
          redirect_uris 
        } = (credentials.installed || credentials.web);

        var auth = new googleAuth();
        this._oauth2Client = new auth.OAuth2(client_id, client_secret, redirect_uris[0] );        
      }

      readJSON( GMail.TOKEN_PATH )
        .then( credentials => resolve( Object.assign( this._oauth2Client, { credentials })))
        .catch( err => resolve( this.onNoAuthTokenFound(err) ) );
    });
  }

  get profile() {
    if( this._profile ) {
      return Promise.resolve(this._profile);
    }
    return readJSON( GMail.PROFILE_PATH ).then( p => this._profile = p);
  }

  send(mail) {
    return this.authorize().then( auth => 
      this.profile.then( profile => new Promise( (resolve,reject) => {
        const payload = {
          auth: auth,
          userId: 'me',
          resource: { 
            raw: createMessage( Object.assign( {}, mail, profile ) )
          }
        };
        google.gmail('v1').users.messages.send(payload, (err,resp) => {
          err && reject(err);
          !err && resolve(resp);
        });
      })));
  }

  get tokenPath() {
    return GMail.TOKEN_PATH;
  }

  onNoAuthTokenFound(err) {
    throw new Error( err, 'no gmail auth token found. Did you generate one with ./bin/gmail-auth.js ?');
  }
}

GMail.TOKEN_DIR    = process.env.HOME + '/credentials/';
GMail.PROFILE_PATH = GMail.TOKEN_DIR + 'gmail-profile.json';     // <-- you create this
GMail.CRED_PATH    = GMail.TOKEN_DIR + 'gmail-credentials.json'; // <-- from console.developers.google.com/api/credentials
GMail.TOKEN_PATH   = GMail.TOKEN_DIR + 'gmail-auth.json';        // <-- written by ../bin/gmail-auth.js

GMail.readJSON = readJSON;

module.exports = GMail;

