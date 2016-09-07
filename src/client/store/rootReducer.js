import { combineReducers } from 'redux';
import user from '../account/store/user';
import groups from '../main/store/groups';
import service from '../m2016-service/service';

const rootReducer = combineReducers ({
  user,
  groups,
  service
});

export default rootReducer;
