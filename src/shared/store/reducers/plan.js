import path from 'jspath';
import planDb from '../../services/plans';

import {
  TOGGLE_ITEM,
  ADD_PLAN_ITEM,
  SAVE_PLAN,
  CLEAR_PLAN
 } from '../actions/plan';

const initialState = {
  planId: '',
  name: '',
  donations: [],
  total: 0,
  dirty: false
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

        dirty: true

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

        dirty: true

      };

      updateTotal(st);

      return st;
    }

    case SAVE_PLAN: {

      const {
        name: planName,
        donations
      } = state;
      
      const body = { 
          planName,
          donations
      };
      
      if( state.planId ) {
        planDb.plansUpdate( state.planId, body );
      } else {
        planDb.plansPost( null, body )
          .then( )
      }
      
      return { ...state, dirty: false };
    }

    case CLEAR_PLAN: {
      if( state.planId ) {

      } else {
      }
    }

    default:
      return state;
  }
};

module.exports = reducer;

