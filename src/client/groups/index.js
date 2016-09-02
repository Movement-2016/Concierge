import 'whatwg-fetch';

const WP_API_HOST = 'm2016dev.wpengine.com';

const WP_API_BASE = 'http://' + WP_API_HOST + '/wp-json/movement-2.1/';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
 
function parseJSON(response) {
  return response.json();
}

class Groups {
  constructor() {
    this.base = WP_API_BASE;
    this.data = null;
  }

  _fetch(part) {
    return fetch( this.base + part )
            .then( checkStatus )
            .then( parseJSON );
  }

  fetch() {
    if( this.data !== null ) {
      return Promise.resolve(this.data);
    }
    return this._fetch( 'orgs' )
        .then ( data => {
          this.data = data;
          return data;
        });
  }

}

module.exports = new Groups();