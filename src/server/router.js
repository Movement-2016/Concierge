const Router            = require( '../shared/services/router'); 
const fs                = require( 'fs');

const { renderToStaticMarkup } = require( 'react-dom/server');
const React                    = require( 'react');

const utils = require('./html-utils');

const store = require('../shared/store');
const { 
  setRoutes,
  renderHTML
} = require('../shared/store/actions/router');

class ServerRouter {

  constructor( routeMap, AppSpec, bodyRegex, pathToIndex ) {
    this.router = new Router(store);
    store.dispatch(setRoutes(routeMap));
    this.indexHTML = fs.readFileSync(pathToIndex,'utf8');
    this.AppSpec = AppSpec;
    this.bodyRegex = bodyRegex;

    store.subscribe( () => {

      const { 
        router,
        router: {
          html,
          navigating,
          notFound,
          target: {
            payload: {
              next = () => {}
            }
          }
        }
       } = store.getState();

      if( navigating ) {

        if( !html ) {
          this.navigate( router );
        }

      } else if( notFound ) {

        next();
      }
    });
  }

  RenderPath( path, req, res, next ) {
    this.router.updateURL( null, path, { res, req, next } );
  }

  navigate( state ) {

    const { 
      target: {
        routeModel: {
          title = '',
          meta = ''
        },
        payload: {
          res
        }
      }
    } = state;

    const {
      App,
      appModel
    } = this.AppSpec;

    const props = { model: {...appModel}, store  };

    var bodyHTML = renderToStaticMarkup( React.createElement( App, props ) );

    var html = this.indexHTML.replace(this.bodyRegex,'$1' + bodyHTML + '$3'); 

    html = utils.titleSetter( title, utils.metaSetter( meta, html ) );

    if( res ) {
      res.setHeader( 'Content-Type', 'text/html' );
      res.end(html);      
    } else {
      process.nextTick( () => store.dispatch( renderHTML(html) ) );
    } 
  }
}

module.exports = ServerRouter;
