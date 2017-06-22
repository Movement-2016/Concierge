/* eslint no-console:off */
const api    = require('./api');
const pages  = require('./pages');

module.exports = app => Promise.all(
      [
        api(app),
        //pages(app)
      ]
    ).then( () => console.log ('Ready to route') );
