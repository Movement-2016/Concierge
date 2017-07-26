import path from 'jspath';

import {
  TOGGLE_ITEM,
  ADD_PLAN_ITEM
 } from '../actions/plan';

const initialState = {
  planId: '',
  name: '',
  donations: [],
  total: 0
};

const updateTotal = st => {
  st.total = path('..amount',st.donations).reduce( (total,amount) => total + Number(amount), 0 );
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ITEM: {

      let { donations } = state;
      const { id } = action;

      const isRemoving = donations.find( d => d.id === id );

      const st = {
        ...state,

        donations: isRemoving
                    ? path(`..{.id!=${id}}`, donations)
                    : donations,

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

    default:
      return state;
  }
};

module.exports = reducer;

