import { 
  createStore, 
  applyMiddleware 
} from 'redux';

import thunk              from 'redux-thunk';
import { createLogger }   from 'redux-logger';


import reducers     from './reducers';
import login        from './middleware/login';

const logger = process.env.NODE_ENV === 'production' 
                                            ? undefined 
                                            : applyMiddleware(createLogger());

// All actions will flow through each middleware until it reaches the 
// end to be passed to Redux reducers
// applyMiddleware() is used to allow for async 

const store = createStore( 

  reducers,

  // reduxThunk allows us to store functions inside our actions (instead of 
  // only objects). Without reduxThunk we could only use very simple actions
    
  applyMiddleware(
    thunk,
    login
  ),


  // tool for visualizing 
  // Redux state changes in the browser console
    
  logger  

);

module.exports = store;
