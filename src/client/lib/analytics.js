//import { browserHistory } from 'react-router';
import path from 'jspath';

(function() {

  if( global.IS_SERVER_REQUEST ) {
    return;
  }

  // TODO: sink the navigate event from the router
  
  // browserHistory.listen( () => {
  //   window.ga && window.ga( 'send', 'pageview', document.location.pathname );
  // });

  const sendGAEvent = ({type,name,data}) => window.ga && window.ga('send', 'event', type, name, data );

  let unsub = null;

  let allVisible = [];
  let prevVisible = [];

  const arrDiff = (a,b) => a.filter( o => b.indexOf(o) < 0 );

  const unsubscribeFromStore = () => unsub && unsub();

  const subscribeToStore = store => {

    if( global.IS_SERVER_REQUEST ) {
      return;
    }

    const state = store.getState();

    allVisible = path('...*', state.groups.visibility);

    unsub = store.subscribe( () => {
      const state      = store.getState();
      const visibility = path('...*', state.groups.visibility);
      let   diff       = arrDiff(allVisible,visibility);
      const prevDiff   = arrDiff(diff,prevVisible);

      if( prevDiff.length ) {
        prevVisible = diff;
        diff = diff.join(',');
        console.log( 'change filter: ', diff );
        sendGAEvent( 'FILTER', 'change', diff );
      }
    });
  };

  module.exports = {
    sendGAEvent,
    unsubscribeFromStore,
    subscribeToStore
  };
})();