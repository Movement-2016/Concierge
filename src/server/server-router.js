const fs                       = require( 'fs');
const { renderToStaticMarkup } = require( 'react-dom/server');
const React                    = require( 'react');

class ReactServerRouter {

  constructor( router, AppSpec, pathToIndexHTML, bodyRegex ) {
    this.router     = router;
    this.indexHTML  = fs.readFileSync(pathToIndexHTML,'utf8');
    this.bodyRegex  = bodyRegex;
    this.AppSpec    = AppSpec;
  }

  resolve(url,req,res,errCallback,successCallback) {
  
    var handlers = this.router.resolve(url);

    if( !handlers ) {
      errCallback( 'file not found', url, req, res );
      return;
    } 

    var h = handlers[0];

    h.component.model(h.params, h.queryParams)

      .then( model => {
    
          const {
            App,
            appModel
          } = this.AppSpec;

          var props = {
            model,
            name:        h.component.displayName,
            component:   h.component,
            path:        req.path,
            params:      h.params,
            queryParams: h.queryParams
          };

          Object.assign( props, appModel );

          var bodyHTML = renderToStaticMarkup( React.createElement( App, props ) );

          var html = this.indexHTML.replace(this.bodyRegex,'$1' + bodyHTML + '$3'); 

          const title = h.component.title || null;
          
          if( title ) {
            html = html.replace( /<title>[^<]+<\/title>/, '<title>' + title + '</title>');
          }

          res.setHeader( 'Content-Type', 'text/html' );
          res.end(html);

          successCallback(url, req, res); 

      }).catch( function(err) {
        errCallback( err, url, req, res );
      });
  }
}

module.exports = ReactServerRouter;