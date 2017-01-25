const listenerApp = require ('./listenerApp');
const listenerUser = require ('./listenerUser');
const listenerMail = require('./listenerMail');


function init (app) {
  listenerApp.init ();
  listenerUser.init ();
  listenerMail.init();

  app.post( '/api/plan/send', listenerMail.mailPlan );
  app.post( '/api/houseparty', listenerMail.houseParty );
  app.post( '/api/contact', listenerMail.contactEmail );

}

exports.init = init;
