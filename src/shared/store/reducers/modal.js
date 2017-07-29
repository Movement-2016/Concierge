
import { 
  OPEN_MODAL, 
  CLOSE_MODAL, 
} from '../actions/modal';

const INITIAL_STATE = {
  open: false,
  name: null
};

const reducer = (state = INITIAL_STATE, action) => {

  switch(action.type){
    case OPEN_MODAL:
      return {
        ...state,
        open: true,
        name: action.name
      };

    case CLOSE_MODAL: {
      return {
        ...state,
        open: false,
        name: null
      };
    }
  }
  return state;
};

module.exports = reducer;
