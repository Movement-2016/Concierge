
import {
  SET_VISIBILITY,
  INIT_FILTERS,
  TOGGLE_SELECTION,
  SET_MODEL
 } from '../actions/groups';

import {
  TOGGLE_ITEM, // Yea, not sure the best way to do this
  GET_PLAN
 } from '../actions/plan';

const initialState = {
  visibility: {},
  selected: [],
  model: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_VISIBILITY: {

      return { ...state, visibility: {...action.visibility}  };
    }

    case TOGGLE_ITEM:
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

    // TODO: this belongs somwewhere else
    
    case GET_PLAN: {
      const { plan } = action;
      return {
        ...state,
        selected: plan.donations.map( d => d.id )
      };
    }

    case SET_MODEL: {
      return {
        ...state,
        model: { ...action.model }
      };
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
