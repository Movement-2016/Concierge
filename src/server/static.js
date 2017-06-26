/* eslint no-console:"off" */
var fs   = require('fs');
var glob = require('glob');
var url  = require('url');

var mimeTypes = [
  [ new RegExp('\.js$'),    'text/javascript'],
  [ new RegExp('\.css$'),   'text/css'],
  [ new RegExp('\.html$'),  'text/html' ],
  [ new RegExp('\.png$'),   'image/png' ],
  [ new RegExp('\.eot$'),   'application/vnd.ms-fontobject eot' ],
  [ new RegExp('\.otf$'),   'font/opentype otf' ],
  [ new RegExp('\.ttf$'),   'font/truetype ttf' ],
  [ new RegExp('\.woff2?$'),'font/woff2' ],
  [ new RegExp('\.svg$'),   'image/svg+xml' ],
  [ new RegExp('\.map$'),   'application/octet-stream' ],
  [ new RegExp('\.jpe?g$'), 'image/jpeg'],
  [ new RegExp('\.ico$'),   'image/x-icon'],
  [ new RegExp('\.xml$'),   'text/xml'],
  [ new RegExp('\.txt$'),   'text/plain'],
];

let maxMem = 0;

class StaticRouter {

  constructor() {
    this.staticIncludes = [];
    this.pathToStaticsRoot = null;

  }

  install(pathToStaticsRoot,app) {

    this.pathToStaticsRoot = pathToStaticsRoot;

    return new Promise( (resolve, reject) => {
      pathToStaticsRoot = pathToStaticsRoot.replace(/\/$/,'');
      var _this = this;
      glob( pathToStaticsRoot + '/**/*.*',function(e,f) {
        if( e ) {
          reject(e);
        } else {
          _this.staticIncludes = f;
          resolve( null, f );
        }
      });
      app.use ('*', this.handle.bind(this) );
      console.log( 'Ready for static routing');
    });
  }

  handle( req, res, next ) {

      var path = url.parse(req.path,true).pathname;

      if( !path || path === '/' ) {
        next();
        return;
      }

      var file = this.pathToStaticsRoot + path;

      if( !this._inner_resolve( file, res ) ) {
        //next();
        const hused = process.memoryUsage().heapUsed;
        if( hused > maxMem ) {
          maxMem = hused;
          console.log( 'returning index.html for ', file,   ' memory: ', maxMem );
        }
        this.sendFile (res,`${this.pathToStaticsRoot}/index.html`);      
      }
  }

  _inner_resolve( pathToStatic, res ) {
    if( pathToStatic.match( '\.js$') && this.staticIncludes.includes( pathToStatic + '.gz' ) ) {

      res.setHeader( 'content-type', 'text/javascript' );
      res.setHeader( 'content-encoding', 'gzip' );
      this.sendFile( res, pathToStatic + '.gz',true);
      return true;
    }

    if( this.staticIncludes.includes( pathToStatic ) ) {
      this.sendFile( res, pathToStatic );
      return true;
    }

    return false;
  }

  sendFile(res,fName,skipMime) {

    fs.readFile(fName, (err, data) => {
      if (err) {
        console.log( 'Error ******', err );
        res.statusCode = 404;
        res.end('Not Found');
      } else {
        if( !skipMime ) {
          var mime = this.sniffMime(fName);
          res.setHeader( 'Content-Type', mime );
        }
        res.end(data);
      }
    });
  }

  sniffMime(fname) {
    for( var i = 0; i < mimeTypes.length; i++ ) {
      if( fname.match(mimeTypes[i][0]) ) {
        return mimeTypes[i][1];
      }
    }
  }

}

module.exports = StaticRouter;