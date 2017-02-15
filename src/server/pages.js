/* eslist no-console:off */
var fs             = require('fs');
var React          = require('react');
var reactServer    = require('react-dom/server');
var reactRedux     = require('react-redux');

var groupsPage         = require('./shared/pages/groups');
var contentPage        = require('./shared/pages/page');

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
  renderToString
} = reactServer;


var reduxStore = configReduxStore();

var indexPageText  = null;
var orgs           = null;
var menu           = null;
var factories      = {};

var wrap = (component,props) => class AppServer extends React.Component {

  render() {
    return React.createElement(
      Provider,
      { store: reduxStore },
      React.createElement(
          'div',
          {className:'site-wrapper'},
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
    var body = renderToString(factories[ReactElement.title]());
    var text = indexPageText.replace('<!-- RENDER CONTENT -->',body);
    res.status(200).send(text);
  };
}

function fetchAndRender(pageName) {
  return (req,res) => {
    service.getPage(pageName).then( content => {
      render(contentPage,() => {return {content:content.fields.html};})(req,res);
    });
  };
}

function pagesRoutes(app) {

  global.IS_SERVER_REQUEST = true;

  service.orgs.then( _orgs => {

    orgs = _orgs;

    return service.menu;
  }).then( _menu => {

    menu = _menu;

    indexPageText = fs.readFileSync('./dist/public/index.html').toString();

    const { initService } = service.actions;

    reduxStore.dispatch( initService(service) );

    service.filters.then( filters => {
      reduxStore.dispatch( initFilters(filters) );

      console.log( 'Ready to render');
    });

  }).catch(err => {
    console.log( 'ERROR GETTING CONTENT: ', err );
  });

  app.use( '/groups', render(groupsPage,() => {return { orgs };} ) );
  app.use( '/about',  fetchAndRender('about') );

}


module.exports = pagesRoutes;