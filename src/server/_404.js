/* eslint no-console:"off" */
const fs = require('fs');

const {
  PATH_TO_404_TEMPLATE,
  REGEX_404
} = require('./config');

let template = null;

const replace = url => `<div id="app" class="not-found-404">Can't file the path ${url}</div>`;

const handler404 = (req,res) => {

  res.setStatusCode = 404;
  var html = template.replace( REGEX_404, replace(req.path) );
  res.end(html);

};

module.exports = (app) => {

  return new Promise( (resolve,reject) => {

    fs.readFile(PATH_TO_404_TEMPLATE, (err, data) => {
      if( err ) {
        reject(err);
      }

      template = data.toString();

      app.use( '*', handler404 );

      console.log( 'Ready 404 handler');

      resolve( handler404 );
    });

  });
};