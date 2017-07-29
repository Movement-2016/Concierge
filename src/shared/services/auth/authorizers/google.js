import React from 'react';
/* globals gapi */

import IdProvider from '../id-provider';

class GoogleLoginButton extends React.Component {

  componentDidMount() {
    window.gapi && gapi.signin2.render('gsignup',
      {
        onsuccess: 'googleLogin'
      });
  }

  render() {
    return (<div className="g-signin2" id="gsignup" data-onsuccess="googleLogin" data-theme="dark"/>);
  }
}

class GoogleLogin extends IdProvider {

  constructor() {
    super({...arguments, name:'google'});
    this._accessToken = null;
  }

  get loginDescriptor() {
    return this._accessToken && { 'accounts.google.com': this._accessToken } ;
  }

  get ux() {
    this._initSDK();
    window.googleLogin = this.getStatus.bind(this);
    return props => {
      // console.log('ux props', props); // eslint-disable-line
      this.props = { ...props };
      return <GoogleLoginButton />;
    };
  }

  logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut(); // <--promise
  }
  
  _initSDK() {
    const {
      Google: {
        clientId,
        scope
      }
    } = this._config;

    const id = 'google-sdk';
    if ( !document.getElementById(id) ) {
      const firstTag = document.getElementsByTagName('script')[0];
      const head     = firstTag.parentNode;

      let meta = document.createElement('meta');
      meta.name = 'google-signin-scope';
      meta.contnent = scope;
      document.getElementsByTagName('head')[0].appendChild(meta);
      meta = document.createElement('meta');
      meta.name = 'google-signin-client_id';
      meta.content = clientId;
      document.getElementsByTagName('head')[0].appendChild(meta);

      const js = document.createElement('script'); 
      js.id = id;
      js.src = 'https://apis.google.com/js/platform.js';
      head.insertBefore(js,firstTag);
    }
  }

  getStatus(googleUser) {

    // if (authResult['status']['signed_in']) {    
    // authResult['id_token']

    if( googleUser ) {
      console.log('googleuser', googleUser); // eslint-disable-line
      this._accessToken = googleUser.getAuthResponse().id_token;
      var profile = googleUser.getBasicProfile();
      const fields = {
        email: profile.getEmail(),
        picture: profile.getImageUrl(),
        first_name: profile.getGivenName(),
        last_name: profile.getFamilyName(),
      };
      this.onAuthenticated(fields);
    } else {
      this._accessToken = null;
      this.onNotAuthenticated();
    }
  }

}

module.exports = new GoogleLogin();

