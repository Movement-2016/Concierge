import { createElement } from 'react';
import { render }        from 'react-dom';

import appModel     from '../shared/models/app';
import Router       from './services/router';     
import { App }      from './components';


if( !global.IS_SERVER_REQUEST ) {

  appModel.model().then( model => {

    const router = Router.service;
    
    router.routes = require('../shared/services/route-map');

    router.once( router.events.NAVIGATE_TO, function(props) {

      render( createElement( App, { ...props, ...model} ),  document.getElementById('app') );

    });
    
    router.updateURL();
  });

}


