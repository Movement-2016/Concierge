import Router from '../services/router';

(function() {

  if( global.IS_SERVER_REQUEST ) {
    return;
  }

//  const sendGAEvent = ({type,name,data}) => window.ga && window.ga('send', 'event', type, name, data );

  Router.service.on( Router.events.NAVIGATE_TO, () => window.ga && window.ga( 'send', 'pageview', document.location.pathname ) );

})();