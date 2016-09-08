import path  from 'jsonpath-plus';

import { 
  INIT_FILTERS,
  TOGGLE_ITEM,
  SET_VISIBILITY
 } from './constants';

const initialState = {
  selected: [],
  visibility: {}
};

export default function groups (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ITEM: {      
      let { selected } = state;
      const { id } = action;
      return { ...state, selected: selected.includes(id)
                                    ? selected.filter( _id => _id !== id )
                                    : [ ...selected, id ] };
    }

    case SET_VISIBILITY: {
      const visibility = { ...state.visibility, [action.cat]: [...action.tags] };
      return { ...state, visibility };
    }

    case INIT_FILTERS: {
      const { filters } = action;
      const visibility = {};
      Object.keys(filters).forEach( f => { visibility[f] = path(`$.${f}[terms][*].name`,filters); } );
      return { ...state, visibility };
    }

    default:
      return state;
  }
}
