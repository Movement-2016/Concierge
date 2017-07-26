import RouteRecognizer  from 'route-recognizer';
import EventEmitter     from 'events';

const PRE_NAVIGATE     = 'PRE_NAVIGATE';
const NAVIGATE_TO      = 'NAVIGATE_TO';
const NOT_FOUND        = 'NOT_FOUND';

class Router extends EventEmitter
{
  constructor() {
    super(...arguments);

    this._routes = null;
    this.events = Router.events;
  }
  
  alertNotFound(payload) {
    this.emit( Router.events.NOT_FOUND, payload );
  }

  get _currentPath() {
    // not supported on server
  }

  get routes() {
    return this._routes;
  }

  set routes( r ) {
    this._routes = r;
    this.recognizer = new RouteRecognizer();
    r.forEach( handler => this.recognizer.add( [ { handler, path: handler.path }]) );
  }

  /*
    convert a url into a component based handler
  */
  resolve(url) {
    const handlers = this.recognizer.recognize(url);
    if( handlers ) {
      // result is an array-like object with a 'queryParams' property
      var queryParams = handlers.queryParams || {};
      return handlers.slice().map( h => { 
                                    return { 
                                      component: h.handler.component,
                                      params: h.params || {},
                                      path: h.handler.path,
                                      queryParams 
                                    };
                                  });
    }
    return null;
  }

  // Called from .navigateTo() and when user hits 'back' or 'foward' button
  // or on the server with 'path'

  updateURL(popStateEvent,path,payload={}) {
    var handlers = this.resolve(path || this._currentPath);
    if (!handlers ) {
      this.alertNotFound(payload); 
      return;
    }
    if( handlers.length > 1 ) {
      throw new Error('wups - don\'t do nested route handlers yet');
    }
    var handler = handlers[0];

    handler.component.model(handler.params, handler.queryParams)
      .then( model => {
  
          const meta = {
            model,              
            name:         handler.component.displayName, 
            component:    handler.component,
            path:         handler.path,
            params:       handler.params,
            queryParams:  handler.queryParams,
            hash:         typeof(document) !== 'undefined' && document.location.hash || '',
            payload
          };
          
          this.emit( Router.events.PRE_NAVIGATE, meta );

          this.emit( Router.events.NAVIGATE_TO, meta);

      }).catch( error => {
        throw error;
      });
  }

}

Router.events = {
  NAVIGATE_TO,
  PRE_NAVIGATE,
  NOT_FOUND
};

module.exports = Router;

