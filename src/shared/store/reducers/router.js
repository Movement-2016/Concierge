
import { 
  SET_ROUTE
} from '../actions/router';

const INITIAL_STATE = {
  model: { },
  params: {  },
  queryParams: { },
  path: ''
};

const reducer = (state = INITIAL_STATE, action) => {

  switch(action.type){

    case SET_ROUTE: {
      const { model, params, path, queryParams } = action;
      return {
        ...state,
        model: { ...model },
        params: { ...params },
        queryParams: { ...queryParams },
        path
      };
    }
  }
  
  return state;
};

module.exports = reducer;
