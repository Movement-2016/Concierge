import { 
  combineReducers 
} from 'redux';

import groups from './groups';
import plan from './plan';
import profile from './profile';
import modal from './modal';
import auth from './auth';
import router from './router';

const roots = combineReducers({
  auth,
  groups,
  plan,
  profile,
  modal,
  router
});

module.exports = roots;  

