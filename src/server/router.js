/* eslint no-console:off */
const Router            = require( '../shared/services/router'); 
const fs                = require( 'fs');

const { renderToStaticMarkup } = require( 'react-dom/server');
const React                    = require( 'react');

const utils = require('./html-utils');

class ServerRouter {

  constructor( routeMap, AppSpec, bodyRegex, pathToIndex ) {
    this.router = new Router();
    this.router.routes = routeMap;
    this.indexHTML = fs.readFileSync(pathToIndex,'utf8');
    this.AppSpec = AppSpec;
    this.bodyRegex = bodyRegex;
    this.router.on( Router.events.NAVIGATE_TO, this.OnNavigate.bind(this) );
    this.router.on( Router.events.NOT_FOUND,   this.OnNotFound.bind(this) );
  }

  RenderPath( path, req, res, next ) {
    this.router.updateURL( null, path, { res, req, next } );
  }

  OnNotFound( payload ) {
    payload.next();
  }

  OnNavigate( props ) {

    const {
      res,
      req
    } = props.payload;

    const {
      App,
      appModel
    } = this.AppSpec;

    Object.assign( props, appModel );

    var bodyHTML = renderToStaticMarkup( React.createElement( App, props ) );

    var html = this.indexHTML.replace(this.bodyRegex,'$1' + bodyHTML + '$3'); 

    html = utils.titleSetter( props.component, utils.metaSetter(  props.component, html ) );

    res.setHeader( 'Content-Type', 'text/html' );
    res.end(html);
  }
}

module.exports = ServerRouter;
