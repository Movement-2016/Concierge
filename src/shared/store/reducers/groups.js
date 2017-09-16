
import {
  TOGGLE_SELECTION,
  FILTER_TOGGLE,
  FILTERS_CLEAR
 } from '../actions/groups';

import {
  TOGGLE_ITEM, // Yea, not sure the best way to do this
  GET_PLAN
 } from '../actions/plan';

import {
  CLEAR_CREDENTIALS // <-- here?
} from '../actions/auth';


const initialState = {
  filters: [],
  selected: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case FILTER_TOGGLE: {

      let { filters } = state;
      const { id } = action;

      const st = {
        ...state,

        filters: filters.includes(id)
                    ? filters.filter( _id => _id !== id )
                    : [ ...filters, id ]
      };

      return st;
    }

    case FILTERS_CLEAR: {
      return { ...state, filters: [] };
    }

    case CLEAR_CREDENTIALS: {// <-- ?? 
      return { ...state, selected: [] };
    }

    case TOGGLE_ITEM:
    case TOGGLE_SELECTION: {

      let { selected } = state;
      const { group } = action;

      const st = {
        ...state,

        selected: selected.includes(group)
                    ? selected.filter( _id => _id !== group )
                    : [ ...selected, group ]
      };

      return st;
    }

    // TODO: this belongs somwewhere else (?)
    
    case GET_PLAN: {
      const { plan } = action;
      return {
        ...state,
        selected: plan.donations.map( d => d.group )
      };
    }

    default:
      return state;
  }
};

module.exports = reducer;
