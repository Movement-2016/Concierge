
/* global AWS */

class IdProvider {

  constructor({name}) {
    this._fields = {};
    this._name = name;
  }

  get loginDescriptor() {
    throw 'derived class of IdProvider must implement loginDescriptor';
  }

  ux(props) { // eslint-disable-line no-unused-vars
    throw 'derived class of IdProvider must implement ux';
  }

  get name() {
    return this._name;
  }
  
  get profile() {
    return this._fields;
  }

  get credentials() {
    const {
      accessKeyId,
      secretAccessKey,
      sessionToken,
      identityId
    } = AWS.config.credentials;

    return {  
      accessKeyId,
      secretAccessKey,
      sessionToken,
      identityId
    };
  }

  set config({ REGION, IDENTITY_POOL_ID, ...otherstuff }) {
    this._config = { REGION, IDENTITY_POOL_ID, ...otherstuff };
  }  

  logout() {

  }

  onAuthenticated(fields) {

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: this._config.IDENTITY_POOL_ID,
        Logins: this.loginDescriptor
      });

      const {
        authenticated,
        error
      } = this.props;

      /*
          Lot of moving parts behind the scenes:

          These are AWS APIs served from AWS-SDK (which is 
          not the same as individual SDKs)

            - CognitoIdentityCredentials ('Credentials' object)

            - CognitoIdentity ('Service')
                getId()
                getCredentialsForIdentity()
                
            - CognitoIdentityServiceProvider ('Service')
            - STS ('Service')


      */
      AWS.config.credentials.get( err => {
        if( err ) {
          error && error(err);
        } else {
          this._fields = fields;
          AWS.config.credentials.identityId && 
            authenticated(this);
        }
      });
  }

  onNotAuthenticated() {
   
    const {
      notAuthenticated
    } = this.props;

    notAuthenticated && notAuthenticated();
  }

}


module.exports = IdProvider;