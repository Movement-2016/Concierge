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
  plan: [],
  planTotal: 0
};

const updateTotal = st => {
  st.planTotal = path('..amount',st.plan).reduce( (total,amount) => total + Number(amount), 0 );
};

export default function groups(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ITEM: {

      let { selected, plan } = state;
      const { id } = action;

      const isRemoving = selected.includes(id);

      const st = {
        ...state,

        plan:     isRemoving
                    ? path(`..{.id!=${id}}`, plan)
                    : plan,

        selected: isRemoving
                    ? selected.filter( _id => _id !== id )
                    : [ ...selected, id ]
      };

      updateTotal(st);

      return st;
    }

    case ADD_PLAN_ITEM: {

      let { plan }         = state;
      const { id, amount } = action;

      const st = { ...state, plan: [ ...path(`..{.id!=${id}}`, plan), { id, amount } ] };

      updateTotal(st);

      return st;
    }

    case SET_VISIBILITY: {
      return { ...state, newVisibility };
    }

    case INIT_FILTERS: {
      const visibility = {};
      const { filters } = action;
      Object.keys(filters).forEach( f => { visibility[f] = [] } );
      return { ...state, visibility };
    }

    default:
      return state;
  }
}
