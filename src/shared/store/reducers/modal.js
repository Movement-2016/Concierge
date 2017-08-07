
import { 
  OPEN_MODAL, 
  CLOSE_MODAL, 
} from '../actions/modal';

const INITIAL_STATE = {
  open: false,
  name: null,
  options: {}
};

const reducer = (state = INITIAL_STATE, action) => {

  switch(action.type){

    case OPEN_MODAL: {
      const {
        name,
        options 
      } = action;
      return {
        ...state,
        open: true,
        name,
        options
      };
    }

    case CLOSE_MODAL: {
      return {
        ...state,
        open: false,
        name: null,
        options: {}
      };
    }
  }
  return state;
};

module.exports = reducer;
