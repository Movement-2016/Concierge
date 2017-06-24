import { combineReducers } from 'redux';
import user from '../account/store/user';
import groups from '../main/store/groups';

const rootReducer = combineReducers ({
  user,
  groups,
});

export default rootReducer;
