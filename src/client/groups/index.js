import 'whatwg-fetch';

const WP_API_HOST = 'movement2016.org'; // 'm2016dev.wpengine.com';

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
    this.taxonomy = null;
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
    return Promise.all( [ this._fetch( 'orgs' ), this._fetch('tags') ] )
        .then ( ([ data, tags ])  => {
          this.data = data;
          this.taxonomy = tags;
          return data;
        });
  }

  get states() {
    return this.taxonomy.groupings.states;
  }

  get filters() {
    return this.taxonomy.filters;
  }
}

module.exports = new Groups();