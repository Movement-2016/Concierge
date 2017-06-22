import RouteRecognizer  from 'route-recognizer';
import EventEmitter     from 'events';

class Router extends EventEmitter
{
  constructor() {
    super(...arguments);

    this._routes = null;

    (typeof window !== 'undefined') && (window.onpopstate = this.updateURL.bind(this));
  }
  
  get routes() {
    return this._routes;
  }

  set routes( r ) {
    this._routes = r;
    this.recognizer = new RouteRecognizer();
    r.forEach( handler => this.recognizer.add( [ { handler, path: handler.path }]) );
  }

  get _currentPath() {
    const { 
      search = '', 
      pathname } = document.location;
    return pathname + search;
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

  /* in browser methods */
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
      if( window.ga ) {
        window.ga( 'send', 'pageview', document.location.pathname );
      }
    }
  }

  // Called from .navigateTo() and when user hits 'back' or 'foward' button
  updateURL() {
    var handlers = this.resolve(this._currentPath);
    if (!handlers ) {
      return window.alert('Not Found');
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
            hash:         document.location.hash || '',
          };
          
          this.emit( Router.events.PRE_NAVIGATE, meta );

          this.emit( Router.events.NAVIGATE_TO, meta);
          
      }).catch( error => {
        throw error;
      });
  }
}

const MODEL_UPDATED    = 'MODEL_UPDATED';
const PRE_NAVIGATE     = 'PRE_NAVIGATE';
const NAVIGATE_TO      = 'NAVIGATE_TO';
const NAVIGATE_TO_THIS = 'NAVIGATE_TO_THIS';

Router.events = {
  MODEL_UPDATED,
  PRE_NAVIGATE,
  NAVIGATE_TO,
  NAVIGATE_TO_THIS
};

const router = new Router();

router.events = Router.events;

module.exports = router;

