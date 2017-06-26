

const reqJSON = req => {

  return new Promise( (resolve, reject) => {

    let data = '';
    
    req.on('data', chunk => data += chunk.toString() );

    req.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch( e ) {
          e.message = `Bad JSON from ${req.path}\n[${data}...]\n${e.message}`;
          reject( e );
        }
    });            
  });
};

module.exports = reqJSON;

