import path    from 'jspath';
import axios   from 'axios';

// for now
import Normalizer from '../lib/normalizer';
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

  init( ) {
    return this;
  }

  query( jspath ) {
    return this.content.then( content => path( jspath, content ) );
             //   .catch( err => console.log( 'error duing query', jspath, ' ERROR: ', err ) );
  }

  queries( hash ) {
    var keys = Object.keys(hash);
    const vals = keys.map( k => this.query(hash[k]) );
    const reducer = (accum,val,index) => (accum[keys[index]] = val, accum);
    return Promise.all(vals)
                  .then( results => results.reduce(reducer,{}) );
  }

  get db() {
    return this.content.then( () => this._db );
  }

  get content() {

    const gotContent = content => {

      this._db = new ContentDB((new Normalizer(content)).db);

      this._promises.content = null; 
      return this._content = content;

    };

    if( this._promises.content ) {
      return this._promises.content;
    }

    return this._content
      ? Promise.resolve(this._content)
      : (this._promises.content = this._fetch( 'content' )).then( gotContent );
  }

  getPage(slug) {
    return this._pages[slug]
      ? Promise.resolve(this._pages[slug])
      : this._fetch( 'page/' + slug ).then( p => this._pages[slug] = p );
  }

}

var service = new MovementVoteService();

module.exports = service;

