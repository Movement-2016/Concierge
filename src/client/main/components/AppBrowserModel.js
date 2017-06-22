import React        from 'react';
import { render }   from 'react-dom';
import appModel     from '../../../shared/models/app';
import router       from '../../../shared/router'; 


const appBrowserModel = App => {

  if( !global.IS_SERVER_REQUEST ) {

    appModel.model().then( model => {

      !router.routes && (router.routes = require('../../../shared/route-map'));

      router.once( router.events.NAVIGATE_TO, function(props) {

        render( React.createElement( App, { ...props, ...model} ),  document.getElementById('app') );

      });
      
      router.updateURL();
    });

  }
};

module.exports = appBrowserModel;
