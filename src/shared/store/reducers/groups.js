
import {
  TOGGLE_SELECTION,
  TOGGLE_FILTER,
  FILTER_CLEAR,
  STATE_FILTER,

  DEFAULT_STATE_FILTER
 } from '../actions/groups';

import {
  TOGGLE_ITEM, // Yea, not sure the best way to do this
  GET_PLAN
 } from '../actions/plan';

const initialState = {
  visibility: [],
  selected: [],
  stateFilter: DEFAULT_STATE_FILTER
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case TOGGLE_FILTER: {

      let { visibility } = state;
      const { id } = action;

      const st = {
        ...state,

        visibility: visibility.includes(id)
                    ? visibility.filter( _id => _id !== id )
                    : [ ...visibility, id ]
      };

      return st;
    }

    case FILTER_CLEAR: {
      return { ...state, visibility: [] };
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

    case STATE_FILTER: {
      const { stateFilter = DEFAULT_STATE_FILTER } = action;
      return { ...state, stateFilter };
    }

    // TODO: this belongs somwewhere else
    
    case GET_PLAN: {
      const { plan } = action;
      return {
        ...state,
        selected: plan.donations.map( d => d.id )
      };
    }

    default:
      return state;
  }
};

module.exports = reducer;
