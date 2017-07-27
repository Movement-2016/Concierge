
import {
  SET_VISIBILITY,
  INIT_FILTERS,
  TOGGLE_SELECTION
 } from '../actions/groups';

const initialState = {
  visibility: {},
  selected: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_VISIBILITY: {

      return { ...state, visibility: {...action.visibility}  };
    }

    case TOGGLE_SELECTION: {

      let { selected } = state;
      const { id } = action;

      const st = {
        ...state,

        selected: selected.includes(id)
                    ? selected.filter( _id => _id !== id )
                    : [ ...selected, id ]
      };

      return st;
    }

    case INIT_FILTERS: {
      const visibility = {};
      const { filters } = action;
      Object.keys(filters).forEach( f => { visibility[f] = []; } );
      return { ...state, visibility };
    }

    default:
      return state;
  }
};

module.exports = reducer;
