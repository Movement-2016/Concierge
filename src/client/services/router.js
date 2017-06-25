import Router from '../../shared/router';


class BrowserRouter extends Router
{
  constructor() {
    super(...arguments);
    if( typeof(window) === 'undefined' ) {
      throw 'BrowserRouter should not be used except in a browser.';
    }
    window.onpopstate = this.updateURL.bind(this);
  }

  get _currentPath() {
    const { 
      search = '', 
      pathname } = document.location;
    return pathname + search;
  }

  navigateTo(url,stateObj) {
    try {
      this.setBrowserAddressBar(url,stateObj);
      this.updateURL();
    } 
    catch(e) {
      throw e;
    }
  }

  setBrowserAddressBar(url,stateObj) {
    if( url ) {
      window.history.pushState(stateObj || null,null,url);
    }
  }

  alertNotFound() {
    super.alertNotFound(...arguments);
    window.alert('Not Found');
  }

}

// hmmm
if( !global.IS_SERVER_REQUEST ) {
  BrowserRouter.service = new BrowserRouter();  
}

module.exports = BrowserRouter;

