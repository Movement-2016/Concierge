import { 
  createStore, 
  applyMiddleware 
} from 'redux';

import thunk              from 'redux-thunk';
import { createLogger }   from 'redux-logger';

import reducers     from './reducers';
import login        from './middleware/login';

const middlewares = [ thunk, login ];

process.env.NODE_ENV !== 'production' && !global.IS_SERVER_REQUEST && middlewares.unshift(createLogger());

module.exports = createStore( reducers, applyMiddleware( ...middlewares ) );
