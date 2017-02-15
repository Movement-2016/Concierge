const listenerMail = require('./listenerMail');
const pages = require('./pages');

function init (app) {

  listenerMail.init();
  pages(app);

  app.post( '/api/plan/send', listenerMail.mailPlan );
  app.post( '/api/houseparty', listenerMail.houseParty );
  app.post( '/api/contact', listenerMail.contactEmail );


}

exports.init = init;
