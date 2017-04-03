/* eslint no-console:off */
var fs           = require('fs');
var React        = require('react');
var reactServer  = require('react-dom/server');
var p2regex      = require('path-to-regexp');

var routeMap     = require('../shared/route-map');
var { 
  App,
  HomePage 
}                = require('../client/main/components');
var service      = require('../shared/m-service');

var { renderToStaticMarkup } = reactServer;

var CE = React.createElement;

var indexPageText  = null;
var menu = null;

routeMap.push( { path: '/', component: HomePage } );

routeMap = routeMap.map( r => {
  r.match = p2regex(r.path.replace('(','').replace(')','?'));
  return r;
});

function _render(elem,res) {
    var body = renderToStaticMarkup(elem);

    var text = indexPageText.replace('<!-- RENDER CONTENT -->',body);

    // meta tags replacement goes here -----
    //
    // text = text.replace('<!-- META TAG CONENT -->', props.metaTags)

    res.status(200).send(text);

}

function renderPage(req, res, next) {

  const route = routeMap.find( r => r.match.test(req.path) );

  const { preloadPage } = route.component;

  const _doRender = props => {
    const elem = CE(App, { menu }, CE(route.component,props) );
    _render( elem, res );
  };

  if( preloadPage ) {
    service.getPage(preloadPage)
      .then( page => _doRender( {page} ) )
      .catch( next );
  } else {
    _doRender();
    //next();
  }

}

function pagesRoutes(app) {

  Promise.all( [ 

    // TODO: do this through a registration process

    service.menu, 
    service.orgs, 
    service.advisors,
    service.news,
    service.testimonials,
    service.states,
    service.colors,
    service.donateTiles

    ] ).then( ([_menu]) => {

      menu = _menu;
      indexPageText = fs.readFileSync('./dist/public/index.html').toString();

      console.log( 'Ready to render');

  }).catch(err => {
    console.log( 'ERROR GETTING CONTENT: ', err );
  });

  routeMap.forEach( route => {
    if( !route.browserOnly ) {
      app.route( route.path ).get( renderPage );
    }
  });
}


module.exports = pagesRoutes;