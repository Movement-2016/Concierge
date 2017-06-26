
class MiddleWare {

  constructor() {
    this._paths = [];
    this.handle = this.handle.bind(this);
  }

  post( path, callback ) {
    this._use( path, callback, 'post' );
  }

  get( path, callback) {
    this._use( path, callback, 'get' );
  }

  use( path, callback ) {
    this._use(path,callback,'*');
  }

  _use( path ,callback, method ) {
    this._paths.push( { method, path, callback} );
  }

  handle( req, res  ) {

    req.path = req.url;

    let continueFlag     = false;
    let responseDoneFlag = false;

    const next = () => {
      continueFlag = true;
    };
    
    const responseDone = () => {
      responseDoneFlag = true;
    };

    res.once( 'finish', responseDone );

    const len = this._paths.length;
    for( var i = 0; i < len && !responseDoneFlag; i++ ) {
      const p = this._paths[i];
      if( p.path === '*' || req.path.match( p.path ) ){
        continueFlag = false; // <-- handler calls next() to indicate it did NOT handle 
        p.callback( req, res, next );
        if( !continueFlag ) {
          break;
        }
      }
    }
  }

  get handler() {
    return this.handle;
  }
}

module.exports = MiddleWare;