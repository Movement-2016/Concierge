

const reqJSON = req => {

  return new Promise( (resolve, reject) => {

    let data = '';
    let done = false;

    const onError = err => {
      if( done ) {
        return;
      }
      done = true;
      reject(err);
    };

    const onDone = () => {
      if( done ) {
        return;
      }
      done = true;
      try {
        resolve(JSON.parse(data));
      } catch( e ) {
        const msg = `Bad JSON from ${req.path}\n[${data}...]\n${e.message}`;
        reject( new Error(msg) );
      }
    };

    req.on('error',   onError ); 
    req.on('end',     onDone ); 
    req.on('aborted', onError ); 
    req.on('close',   onDone );     
    req.on('data', chunk => data += chunk.toString() );

  });
};

module.exports = reqJSON;

