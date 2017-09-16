import React from 'react';
/* globals FB */

import IdProvider from '../id-provider';

class FacebookLoginButton extends React.Component {

  componentDidMount() {
    window.FB && FB.XFBML.parse();
  }

  render() {

    const {
      size         = 'large',
      type         = ['login_with','continue_with'][0],
      profilePick  = false,
      friends      = false,
      width        = undefined,
      autoLogout   = 'false',
      scope        = 'public_profile,email',
      className    = 'fb-login-button'
    } = this.props;

    const bool = { [true]: 'true', [false]: 'false' };

    return (<div className={className}
                 data-max-rows="1" 
                 data-width={width}
                 data-size={size}
                 data-button-type={type}
                 data-show-faces={bool[friends]}
                 data-auto-logout-link={bool[autoLogout]}
                 data-use-continue-as={bool[profilePick]}
                 data-scope={scope}
                 data-onlogin="checkloginState();"
            />);
  }
}

class FacebookLogin extends IdProvider {

  constructor() {
    super({...arguments, name:'facebook'});
    this._accessToken = null;
  }

  get fbConfig() {
    return this._config.identityProviders.Facebook;
  }

  _initSDK() {
    const { clientId } = this.fbConfig;

    window.checkloginState = this.getStatus.bind(this);
    window.fbAsyncInit = function() {
      FB.init({
        appId            : clientId,
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.9'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s); 
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=' + clientId;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));    
  }

  get loginDescriptor() {
    return this._accessToken && { 'graph.facebook.com': this._accessToken } ;
  }


  get ux() {
    this._initSDK();
    return props => {
      this.props = { ...props };
      return <FacebookLoginButton {...this.fbConfig.buttonOptions} />;
    };
  }

  logout() {
    return new Promise( resolve => FB.logout( resolve(true) ));
  }
  
  getStatus() {
    FB.getLoginStatus( response => {
        if( response.status === 'connected' ) {
            this._accessToken = response.authResponse.accessToken;

            FB.api( '/me', { fields: this.fbConfig.fields }, 
                    fields => {
                      const {
                        first_name,
                        last_name,
                        email,
                        picture: {
                          data: {
                            url: picture
                          }
                        }
                      } = fields;
                      const profile = {
                        fname: first_name,
                        lname: last_name,
                        email,
                        picture
                      };
                      this.onAuthenticated( profile );
                    } );
        } else {
          this._accessToken = null;
          this.onNotAuthenticated();
        }
      });      
  }

}

module.exports = new FacebookLogin();

