/*
  The current scheme for server rendering is a temp scheme to get 
  things up and running and prove that server rendering is workable.
  In the real world we'd be using a single routing mechanism for
  both client/server, prefetch all the data based on page's requirements
  BEFORE invoking the page component, not in the componentWillMount
  callback and we could isolate the browser-only code (jquery) all
  along the way. 

  As of this writing none of that happening. Instead, we share the 
  inner display mechanism between server and browser rendering, those
  are wrapped in different but similar mechanism depending on server
  vs client, the server is contanimated with browser only javascript
  and there is a completely different routing mechanism used between
  server and browser.

*/
/* eslint no-console:off */
var fs             = require('fs');
var React          = require('react');
var reactServer    = require('react-dom/server');
var reactRedux     = require('react-redux');

var groupsPage         = require('./shared/pages/groups');
var contentPage        = require('./shared/pages/page');
var advisorPage        = require('./shared/pages/advisors');
var homePage           = require('./shared/pages/home');

var Nav                = require('./shared/components/Nav.jsx');
var Footer             = require('./shared/components/Footer.jsx');
var service            = require('./shared/m-service');
var groupActions       = require('./shared/store/actions');
var configReduxStore   = require('./redux-store');

var {
  initFilters
} = groupActions;

var {
  Provider
} = reactRedux;

var { 
  renderToStaticMarkup
} = reactServer;


var reduxStore = configReduxStore();

var indexPageText  = null;
var orgs           = null;
var menu           = null;
var advisors       = null;
var factories      = {};

var wrap = (component,props) => class AppServer extends React.Component {

  render() {
    return React.createElement(
      Provider,
      { store: reduxStore },
      React.createElement(
          'div',
          {className:'site-wrapper hidden'},
          React.createElement(Nav,{menu, siteTitle:'MovementServerRender'}),
          React.createElement(component,props),
          React.createElement(Footer,null)
        )
    );
  }
};

function render(ReactElement,props) {

  return (req,res) => {
    if( !factories[ReactElement.title] ) {
      var element = wrap(ReactElement,props());
      factories[ReactElement.title] = React.createFactory(element);
    }
    var body = renderToStaticMarkup(factories[ReactElement.title]());
    var text = indexPageText.replace('<!-- RENDER CONTENT -->',body);
    // meta tags replacement goes here -----
    //
    // text = text.replace('<!-- META TAG CONENT -->', props.metaTags)

    res.status(200).send(text);
  };
}

function fetchAndRender(pageName) {
  return (req,res) => {
    service.getPage(pageName).then( content => {
      contentPage.title = pageName;
      render(contentPage,() => {return {content:content.fields.html};})(req,res);
    });
  };
}

function fetchAndRenderHome() {
  return (req,res) => 
    Promise.all( [
      service.donateTiles,
      service.testimonials,
      service.news,
      service.getPage('home')
      ]).then( ([ donateTiles, testimonials, news, home ]) => {
        render(homePage,() => {return{ donateTiles, testimonials, news, home };})(req,res);
      });
}

function pagesRoutes(app) {

  Promise.all( [ 
    service.orgs, 
    service.menu, 
    service.advisors,
    service.filters 

    ] ).then( ([_orgs,_menu,_advisors,filters]) => {

    orgs     = _orgs;
    menu     = _menu;
    advisors = _advisors;

    indexPageText = fs.readFileSync('./dist/public/index.html').toString();

    const { initService } = service.actions;

    reduxStore.dispatch( initService(service) );
    reduxStore.dispatch( initFilters(filters) );

    console.log( 'Ready to render');

  }).catch(err => {
    console.log( 'ERROR GETTING CONTENT: ', err );
  });

  app.use( '/groups',   render(groupsPage,()  => {return { orgs     };} ) );
  app.use( '/advisors', render(advisorPage,() => {return { advisors };} ) );

  app.use( '/about',  fetchAndRender('about') );
  app.use( '/team',  fetchAndRender('team') );

  app.get( '/', fetchAndRenderHome() ); 

}


module.exports = pagesRoutes;