import { combineReducers } from 'redux';

import auth from './auth';

// pass in an object to combineReducers() that represents a mapping of each reducers
// in a component we can reference the `authorized` attribute with `state.auth.authorized`

const rootReducer = combineReducers({
  auth,
});

// export the combined reducers for use inside `store/index.js` to 
// create the Redux store (aka the Redux state)

module.exports = rootReducer;
