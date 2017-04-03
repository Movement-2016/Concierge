
import PromisePolyfill from 'es6-promise-polyfill';

if( !global.IS_SERVER_REQUEST && typeof window.Promise === 'undefined' ) {
  window.Promise = PromisePolyfill.Promise || PromisePolyfill;
}

if( typeof Array.prototype.includes === 'undefined' ) {
  Array.prototype.includes = o => this.indexOf(o) !== -1;
}