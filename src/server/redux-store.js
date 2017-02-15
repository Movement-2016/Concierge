
var serviceStore   = require('./shared/m-service/service');
var groupsStore    = require('./shared/store/groups').default;

var redux          = require('redux');
var thunk          = require('redux-thunk').default;

var {
  combineReducers,
  createStore,
  applyMiddleware
} = redux;


const initialUserState = {
  authenticated: false,
  username: '',
  fname: '',
  lname: '',
  email: '',
  phone: '',
  favorites: [],
  donations: [],
};

var userStore = () => initialUserState;

const rootReducer = combineReducers ({
  service: serviceStore,
  groups: groupsStore,
  user: userStore
});

module.exports = (initialState) => {
  return (createStore (rootReducer, initialState,applyMiddleware(thunk)) );
};
