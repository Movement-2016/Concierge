/* eslint no-console:off */

const BODY_REGEX         = /(<div id="app">)(<!-- RENDER CONTENT -->)(<\/div>)/;
const PATH_TO_INDEX_HTML = './dist/public/index.html';

const routeMap          = require( '../shared/route-map');
const router            = require( '../shared/router'); 
const ReactServerRouter = require( './server-router');

const { App }    = require( '../client/main/components');
const appModel   = require( '../shared/models/app' );

router.routes = routeMap.filter( r => !r.browserOnly );

let reactRouter = null;

function renderPage(req, res, next) {

  console.log('=======> calling router for ', req.path);

  reactRouter.resolve(req.path,req,res,
      err => {
        err;
        next();
      }, 
      (url, req, res) => {
        res;
      }
    );
}

function pagesRoutes(app) {
  let ret = null;
  try {
     ret = appModel.model().then( appModel => {
      reactRouter = new ReactServerRouter( router, { App, appModel }, PATH_TO_INDEX_HTML, BODY_REGEX ) ;
      app.get( '*', renderPage );
      console.log( 'Ready for routing');
    }).catch( err => {
      console.log( '=====> Error during route initialization ', err );
    });
  } catch( err ) {
      console.log( '=====> Error during route initialization ', err );    
  }
  return ret;
}

module.exports = pagesRoutes;
