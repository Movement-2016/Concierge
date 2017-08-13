
import {
  SET_VISIBILITY,
  INIT_FILTERS,
  TOGGLE_SELECTION,
  FILTER_REQUEST,
  FILTER_CLEAR,
  STATE_FILTER,

  DEFAULT_STATE_FILTER
 } from '../actions/groups';

import {
  TOGGLE_ITEM, // Yea, not sure the best way to do this
  GET_PLAN
 } from '../actions/plan';

const initialState = {
  visibility: {},
  selected: [],
  stateFilter: DEFAULT_STATE_FILTER
};

const setVisiblity = ( state, visibility) => ({ ...state, visibility: {...visibility}  });

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case FILTER_REQUEST: {
      const { category, term, addFilter } = action;
      const { 
        visibility,
        visibility: {
          [category]: cat = []
        }
      } = state;

      const incs = cat.includes(term);

      return ( incs === addFilter )
        ? state
        : setVisiblity(state,{ ...visibility, [category]: incs ? cat.filter( t => t !== term ) : [...cat, term ] } );
    }

    case FILTER_CLEAR: {
      const { visibility } = state;
      return setVisiblity( state, Object.keys(visibility).reduce( (accum,key) => (accum[key] = [],accum), {} ) );
    }

    case SET_VISIBILITY: {
      return setVisiblity(state,action.visibility);
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
