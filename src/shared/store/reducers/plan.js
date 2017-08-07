import path from 'jspath';

import {
  TOGGLE_ITEM,
  ADD_PLAN_ITEM,
  SAVE_PLAN,
  CLEAR_PLAN
 } from '../actions/plan';

const initialState = {
  planId: '',
  planName: '',
  donations: [],
  total: 0,
  status: { empty: true },
  error: ''
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
                    : [ ...donations, { id, amount: 0 } ],

        status: { dirty: true }

      };

      updateTotal(st);

      return st;
    }

    case ADD_PLAN_ITEM: {

      let { donations }    = state;
      const { id, amount } = action;

      const st = { 
        ...state, 

        donations: [ ...path(`..{.id!=${id}}`, donations), { id, amount } ],

        status: { dirty: true }

      };

      updateTotal(st);

      return st;
    }

    case SAVE_PLAN: {
      const { status, value } = action;
      return { 
        ...state, 
        status: { [status]: true },
        error: status === 'error' && value,
        planId: (status === 'saved' && value) || state.planId
      };
    }

    case CLEAR_PLAN: {
      return { ...state, ...initialState };
    }

    default:
      return state;
  }
};

module.exports = reducer;

