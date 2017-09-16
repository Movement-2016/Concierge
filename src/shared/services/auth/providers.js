/* global AWS */

class IDAuthorizationProviders {

  get providers() {
    if( global.IS_SERVER_REQUEST ) {
      return [];
    }

    if( !this.__providers ) {
      const authorizers = require('./authorizers');
      this.__providers = Object
                          .keys(authorizers)
                          .filter( key => key !== 'default' )
                          .map( key => authorizers[key] );      
    }

    return this.__providers;
  }

  set config({ REGION, IDENTITY_POOL_ID, ...otherstuff }) {
    AWS.config.update({
      region: REGION
    });
    this._config = { REGION, IDENTITY_POOL_ID, ...otherstuff };
    this.providers.forEach( p => p.config = this._config );
  }  
  

  add(provider) {
    if( !global.IS_SERVER_REQUEST ) {
      provider.config = this._config;
      this.providers.push(provider);
    }
  }

  find(name) {
    return this.providers.find( p => p.name === name );
  }
  
  [Symbol.iterator]() {

    const p = [...this.providers];
    return {
      current: 0,
      last: p.length - 1,

      next() {
        if (this.current <= this.last) {
          return { done: false, value: p[this.current++] };
        } else {
          return { done: true };
        }
      }
    };
  }
}


const providers = new IDAuthorizationProviders();

module.exports = providers;