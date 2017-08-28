const routeMap          = require( '../shared/services/route-map');
const Router            = require( './router'); 

const { App }    = require( '../client/components');
const AppModel   = require( '../shared/models/app' );

const { 
  BODY_REGEX,
  PATH_TO_INDEX_HTML
} = require('./config');

let router = null;

function renderPage(req, res, next) {
  router.RenderPath( req.path, req, res, next );
}

function pagesRoutes(app) {

  return AppModel.model().then( appModel => {

    router = new Router( routeMap.filter( r => !r.browserOnly ), 
                        { App, appModel }, 
                        BODY_REGEX, 
                        PATH_TO_INDEX_HTML );

    app && app.get( '*', renderPage );

    console.log( 'Ready for routing'); // eslint-disable-line

  }).catch( err => {
    
    console.log( '=====> Error during route initialization ', err ); // eslint-disable-line
  
  });
  
}

module.exports = pagesRoutes;
