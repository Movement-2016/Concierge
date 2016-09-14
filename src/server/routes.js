const listenerApp = require ('./listenerApp');
const listenerUser = require ('./listenerUser');
const listenerMail = require('./listenerMail');


function init (app) {
  listenerApp.init ();
  listenerUser.init ();
  listenerMail.init();

  /*
  app.post ('/api/login', listenerUser.login);
  app.post ('/api/logout', listenerUser.logout);
  app.get ('/api/verifylogin', listenerUser.verifyLogin);
  app.post ('/api/register', listenerUser.register);
  app.get ('/api/profile', isAuthenticated, listenerUser.getProfile);
  app.post ('/api/profile', isAuthenticated, listenerUser.updateProfile);

  app.get ('/api/plan/:_id', listenerApp.getPlan);
  app.post ('/api/plan', listenerApp.createPlan);
  app.post ('/api/plan/:_id', listenerApp.updatePlan);

  app.get ('/api/data', listenerApp.getData);
  */
  app.post( '/api/plan/send', listenerMail.mailPlan );

}

// authenticate, if passing continue, otherwise return 401 (auth failure)
/*
function isAuthenticated (req, res, next) {
  if (req.isAuthenticated ()) {
    return next ();
  } else {
    return res.status (401).json ({});
  }
}
*/

exports.init = init;
