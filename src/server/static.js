/* eslint no-console:"off" */
var fs   = require('fs');
var glob = require('glob');
var url  = require('url');

const {
  PUBLIC_DIR
} = require('./config');

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

class StaticRouter {

  constructor() {
    this.staticIncludes = [];
    this.pathToStaticsRoot = null;
  }

  install(app) {

    this.pathToStaticsRoot = PUBLIC_DIR;

    return new Promise( (resolve, reject) => {

      this.pathToStaticsRoot = this.pathToStaticsRoot.replace(/\/$/,'');

      glob( this.pathToStaticsRoot + '/**/*.*', (e,f) => {
        if( e ) {
          reject(e);
        } else {
          this.staticIncludes = f;
          console.log( 'Ready for static routing');
          resolve( null, f );
        }
      });

      app.use ('*', this.handle.bind(this) );

    });
  }

  handle( req, res, next ) {

      var path = url.parse(req.path,true).pathname;

      if( !path || path === '/' ) {
        next();
        return;
      }

      var file = this.pathToStaticsRoot + path;

      if( !this._inner_resolve( file, res, next ) ) {
        next();
      }
  }

  _inner_resolve( pathToStatic, res, next ) {
    if( pathToStatic.match( '\.js$') && this.staticIncludes.includes( pathToStatic + '.gz' ) ) {

      res.setHeader( 'content-type', 'text/javascript' );
      res.setHeader( 'content-encoding', 'gzip' );
      this.sendFile( res, pathToStatic + '.gz', true, next);
      return true;
    }

    if( this.staticIncludes.includes( pathToStatic ) ) {
      this.sendFile( res, pathToStatic, false, next );
      return true;
    }

    // let's encrypt using this hidden directory to temporarily
    // store and retrieve files during cert creation/renewal
    
    if( pathToStatic.match( /\.well-known/ ) ) {
      try {
        this.sendFile( res, pathToStatic, true, next );
        return true;
      } catch(e) {
        return false;
      }
    }

    return false;
  }

  sendFile(res,fName,skipMime,next) {

    fs.readFile(fName, (err, data) => {
      if (err) {
        next();
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