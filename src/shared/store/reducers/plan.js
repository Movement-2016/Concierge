import path from 'jspath';

import {
  TOGGLE_ITEM,
  ADD_PLAN_ITEM,
  SAVE_PLAN,
  CLEAR_PLAN,
  GET_PLAN,
  LOCK_PLAN
 } from '../actions/plan';

import {
  CLEAR_CREDENTIALS // <-- here?
} from '../actions/auth';

const initialState = {
  planId: '',
  planName: '',
  donations: [],
  total: 0,
  status: { empty: true },
  error: '',
  locked: false
};

const updateTotal = st => {
  st.total = path('..amount',st.donations).reduce( (total,amount) => total + Number(amount), 0 );
  return st;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case LOCK_PLAN: {
      const { locked } = action;
      return { ...state, locked };
    }

    case TOGGLE_ITEM: {

      let { donations } = state;
      const { id } = action;

      const isRemoving = donations.find( d => d.id === id );

      return( updateTotal( {
        ...state,

        donations: isRemoving
                    ? path(`..{.id!=${id}}`, donations)
                    : [ ...donations, { id, amount: 0 } ],

        status: { dirty: true }

      }));
    }

    case ADD_PLAN_ITEM: {

      let { donations }    = state;
      const { id, amount } = action;

      return( updateTotal({ 
        ...state, 

        donations: [ ...path(`..{.id!=${id}}`, donations), { id, amount } ],

        status: { dirty: true }

      }));
    }

    case GET_PLAN: {
      const { plan } = action; // <-- plan came from cloud

      return( updateTotal({ ...state, ...plan }) );
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

    case CLEAR_CREDENTIALS: // <-- yea?
    case CLEAR_PLAN: {
      return { ...state, ...initialState };
    }

    default:
      return state;
  }
};

module.exports = reducer;

