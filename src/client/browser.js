import { createElement } from 'react';
import { render }        from 'react-dom';

import appModel        from '../shared/models/app';
import store           from '../shared/store';
import { setRoutes }   from '../shared/store/actions/router';
import providers       from '../shared/services/auth/providers';
import Router          from './services/router';     
import { App }         from './components';
import config          from '../config';
import { initFilters } from '../shared/store/actions/groups';


if( !global.IS_SERVER_REQUEST ) {
  
  providers.config = config;

  appModel.model().then( model => {

    // Step 1. initialize UX filters 
    //         this browser only
    //         makes no sense to do this on server

    const {
      groupFilters 
    } = model;

    store.dispatch( initFilters(groupFilters) );

    // Step 2. initialize router
    //         the browser has a different route map from server
    //         see server/pages.js 

    const router = Router.service = new Router(store);    
    const routeMap = require('../shared/services/route-map');
    store.dispatch( setRoutes(routeMap) );

    // Step 3. Render the App into the index.html via DOM
    //         the server uses a different API to do this


    // only need to observe the first time we navigate 
    // after this time the App component will monitor 
    // state changes

    let unsub = store.subscribe( () => {
      const { router } = store.getState();
      if( router.navigating ) {

        // unsub first to avoid recursive notifications
        unsub();

        render( createElement( App, {store,model} ), document.getElementById('app') );
      }
    });
    
    // Step 4. Trigger a navigation state change
    //

    router.updateURL();
  });

}


