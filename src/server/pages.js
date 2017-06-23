/* eslint no-console:off */

const BODY_REGEX         = /(<div\s+id="app">)([^<]+)?(<\/div>)/;
const PATH_TO_INDEX_HTML = './dist/public/index.html';

//const p2regex           = require( 'path-to-regexp');

//const routeMap          = require( '../shared/route-map');
const router            = require( '../shared/router'); 
const ReactServerRouter = require( './server-router');
const { App }           = require( '../client/main/components');

// router.routes = routeMap.filter( r => !r.browserOnly );

// .map( r => {
//   const fixedPath = r.path.replace('(','').replace(')','?');
//   r.match = p2regex(fixedPath);
//   return r;
// });

let reactRouter = null;

function renderPage(req, res, next) {

  if( !reactRouter ) {
    reactRouter = new ReactServerRouter( router, App, PATH_TO_INDEX_HTML, BODY_REGEX ) ;
  }

  reactRouter.resolve(req.path,req,res,next, (url, req, res) => {
      return res; // quiet warning
    });
}

function pagesRoutes(app) {
    console.log( 'setting up app pages-------------------');
    return Promise.resolve( app.get( '/*', renderPage ), 1 );
}

module.exports = pagesRoutes;
