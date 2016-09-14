import path from 'jspath';

import { 
  INIT_FILTERS,
  TOGGLE_ITEM,
  SET_VISIBILITY,
  ADD_PLAN_ITEM
 } from './constants';

const initialState = {
  selected: [],
  visibility: {},
  plan: []
};

export default function groups (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ITEM: {      
      
      let { selected, plan } = state;
      const { id } = action;

      const isRemoving = selected.includes(id);

      return { 
        ...state, 

        plan:     isRemoving 
                    ? path(`..{.id!=${id}}`, plan)
                    : plan,

        selected: isRemoving
                    ? selected.filter( _id => _id !== id )
                    : [ ...selected, id ] 
      };
    }

    case ADD_PLAN_ITEM: {

      let { plan }         = state;
      const { id, amount } = action;

      return { ...state, plan: [ ...path(`..{.id!=${id}}`, plan), { id, amount } ] };
    }

    case SET_VISIBILITY: {
      const visibility = { ...state.visibility, [action.cat]: [...action.tags] };
      return { ...state, visibility };
    }

    case INIT_FILTERS: {
      const { filters } = action;
      const visibility = {};
      Object.keys(filters).forEach( f => { visibility[f] = path('.terms..name',filters[f]); } );
      return { ...state, visibility };
    }

    default:
      return state;
  }
}
