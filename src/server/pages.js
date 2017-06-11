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

// var commaize = require('commaize');

var { renderToStaticMarkup } = reactServer;

var indexPageText  = null;
var menu = null;
var renderCache = {};

routeMap = routeMap.filter( r => !r.browserOnly ).map( r => {
  const fixedPath = r.path.replace('(','').replace(')','?');
  r.match = p2regex(fixedPath);
  return r;
});

routeMap.push( { path: '/', component: HomePage, match: /^\/$/ } );

function htmlFromElement(elem) {

  var body = renderToStaticMarkup(elem);

  var text = indexPageText.replace('<!-- RENDER CONTENT -->',body);

  // meta tags replacement goes here -----
  //
  // text = text.replace('<!-- META TAG CONENT -->', props.metaTags)

  return text;

}

function render(res,component,name,props) {

    // const heap = process.memoryUsage().heapUsed;
    // console.log( 'page render ',name,' - memory: ', commaize(heap) );

    var text = renderCache[name];
    if( text ) {
      // console.log('serving cached page ', name);
    } else {
      var CE            = React.createElement;
      let elem          = CE(App, { menu }, CE(component,props) );
      text              = htmlFromElement( elem  );      
      renderCache[name] = text;
    }
    res.status(200).send(text);
}

function renderPage(req, res, next) {

  const name = req.path;

  const route = routeMap.find( r => r.match.test(name) );
  
   if( !route ) {
    next();
    return;
  }

  // console.log( 'returning ',name,' - memory: ', process.memoryUsage().heapUsed );
  
  const { 
    component,
    component: {
      preloadPage
    }
  } = route;

  if( preloadPage ) {
    const page = service.cachedPage(preloadPage);
    if( page ) {
      render( res, component, name, {page} );
    } else {
      service.getPage(preloadPage)
        .then( page => render( res, component, name, {page} ) )
        .catch( next );      
    }
  } else {
    render( res, component, name, {} );
  }

}

function clearCache(req, res) {  
  for( var key in renderCache ) {
    renderCache[key] = null;
  }
  res.status(200).send('cache cleared');
}

function pagesRoutes(app) {

  return Promise.all( [ 

    // TODO: do this through a registration process

    service.menu, 
    service.orgs, 
    service.advisors,
    service.news,
    service.testimonials,
    service.states,
    service.colors,
    service.filters,
    service.groups,
    service.donateTiles,
    service.getPage('home')

    ] ).then( ([_menu]) => {

      menu = _menu;
      indexPageText = fs.readFileSync('./dist/public/index.html').toString();

      app.get( '/*', renderPage );

      app.use( '/api/clearcache', clearCache );

      console.log( 'Ready to render');

  }).catch(err => {
    console.log( 'ERROR GETTING CONTENT: ', err );
  });

}


module.exports = pagesRoutes;
