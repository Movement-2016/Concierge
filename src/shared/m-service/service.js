import { 
  INIT_SERVICE
} from './constants';

const initialState = {};

function service (state = initialState, action) {
  switch (action.type) {
    case INIT_SERVICE: {
      return action.service;
    }
    default:
      return state;
  }
}

module.exports = service;