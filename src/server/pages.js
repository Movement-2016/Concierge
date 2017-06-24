/* eslint no-console:off */
const routeMap          = require( '../shared/route-map');
const router            = require( '../shared/router'); 
const ReactServerRouter = require( './server-router');

const { App }    = require( '../client/main/components');
const appModel   = require( '../shared/models/app' );

const BODY_REGEX         = /(<div id="app">)(<!-- RENDER CONTENT -->)(<\/div>)/;
const PATH_TO_INDEX_HTML = './dist/public/index.html';

router.routes = routeMap.filter( r => !r.browserOnly );

let reactRouter = null;

function renderPage(req, res, next) {
  reactRouter.resolve( req.path, req, res, () => next() );
}

function pagesRoutes(app) {

  return appModel.model().then( appModel => {
    reactRouter = new ReactServerRouter( router, { App, appModel }, PATH_TO_INDEX_HTML, BODY_REGEX ) ;
    app.get( '*', renderPage );
    console.log( 'Ready for routing');
  }).catch( err => {
    console.log( '=====> Error during route initialization ', err );
  });
  
}

module.exports = pagesRoutes;
