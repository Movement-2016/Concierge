const fs                       = require( 'fs');
const { renderToStaticMarkup } = require( 'react-dom/server');
const React                    = require( 'react');

class ReactServerRouter {

  constructor( router, AppModule, pathToIndexHTML, bodyRegex ) {
    this.router     = router;
    this.indexHTML  = fs.readFileSync(pathToIndexHTML,'utf8');
    this.bodyRegex  = bodyRegex;
    this.AppFactory = React.createFactory(AppModule);
  }

  resolve(url,req,res,errCallback,successCallback) {
  
    var handlers = this.router.resolve(url);

    if( !handlers ) {
      res.statusCode = 404;
      res.end('Not Found');
      successCallback(url,req,res);
      return;
    } 

    var h = handlers[0];

    h.component.model(h.params, h.queryParams)

      .then( model => {
    
          var props = {
            model,
            name:        h.component.displayName,
            component:   h.component,
            params:      h.params,
            queryParams: h.queryParams 
          };

          var bodyHTML = renderToStaticMarkup( this.AppFactory(props) );

          // bodyHTML = '<i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i><div class="hidden">'  
          //              + bodyHTML
          //              + '</div>';

          var html = this.indexHTML.replace(this.bodyRegex,'$1' + bodyHTML + '$3'); 

          const title = h.component.title || null;
          
          if( title ) {
            html = html.replace( /<title>[^<]+<\/title>/, '<title>' + title + '</title>');
          }

          res.setHeader( 'Content-Type', 'text/html' );
          res.end(html);

          successCallback(url, req, res); 

      }).catch( function(err) {
        errCallback( url, req, res, err );
      });
  }
}

module.exports = ReactServerRouter;