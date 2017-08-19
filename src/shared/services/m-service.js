import path    from 'jspath';
import axios   from 'axios';

// for now
import ContentDB  from './content';

let _fetch = axios;

import {
  M_SERVICE_END_POINT 
} from '../../config';

function checkStatus(response) {
  if (!response.status || (response.status >= 200 && response.status < 300)) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.data; 
}

// function debugLog(result) {
//   console.log( 'AXIOS RESULT: ', result );
//   return result;
// }

class MovementVoteService {
  constructor() {
    this._base = M_SERVICE_END_POINT;
    this._pages = {};
    this._promises = {};
  }

  _fetch(part) {
    return _fetch( this._base + part )
            // .then( debugLog )
            .then( checkStatus )
            .then( parseJSON );
            // .catch( debugLog );
  }


  get db() {

    if( this._db ) {
      return Promise.resolve(this._db);
    }

    if( this._promises.content ) {
      return this._promises.content;
    }

    this._promises.content = this._fetch( 'content' ).then( content => {
        this._db = new ContentDB();
        this._db.data = content;
        this._promises.content = null;
        return this._db;
      });

    return this._promises.content;
  }

  getPage(slug) {
    const page = this._db.getPage(slug);

    return page
      ? Promise.resolve(page)
      : this._fetch( 'page/' + slug ).then( json => this._db.addPage(slug,json));
  }

}

var service = new MovementVoteService();

module.exports = service;

