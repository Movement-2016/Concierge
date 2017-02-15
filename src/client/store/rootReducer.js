import { combineReducers } from 'redux';
import user from '../account/store/user';
import groups from '../main/store/groups';
import service from '../../shared/m-service/service';

const rootReducer = combineReducers ({
  user,
  groups,
  service
});

export default rootReducer;
