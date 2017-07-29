import { createElement } from 'react';
import { render }        from 'react-dom';

import appModel      from '../shared/models/app';
import providers     from '../shared/services/auth/providers';
import Router        from './services/router';     
import { App }       from './components';
import config        from '../config';

if( !global.IS_SERVER_REQUEST ) {
  
  providers.config = config;

  appModel.model().then( model => {

    const router = Router.service;
    
    router.routes = require('../shared/services/route-map');

    router.once( router.events.NAVIGATE_TO, function(props) {

      render( createElement( App, { ...props, ...model} ),  document.getElementById('app') );

    });
    
    router.updateURL();
  });

}


