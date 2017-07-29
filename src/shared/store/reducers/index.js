import { 
  combineReducers 
} from 'redux';

import groups from './groups';
import plan from './plan';
import profile from './profile';
import modal from './modal';
import auth from './auth';

const roots = combineReducers({
  auth,
  groups,
  plan,
  profile,
  modal
});

module.exports = roots;  

