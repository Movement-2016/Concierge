import plansAPI from '../../services/plans';

import {
  toggleSelection
} from './groups';

const TOGGLE_ITEM   = 'TOGGLE_GROUP';
const ADD_PLAN_ITEM = 'ADD_PLAN_ITEM';
const SAVE_PLAN     = 'SAVE_PLAN';
const CLEAR_PLAN    = 'CLEAR_PLAN';


const _toggleItem = id => ({ type: TOGGLE_ITEM, id });


const toggleItem = id =>  dispatch => dispatch(_toggleItem(id)) && dispatch(toggleSelection(id));

const addPlanItem = (id,amount) => ({ type: ADD_PLAN_ITEM, id, amount });

const savePlan = () => (dispatch,getState) => {
  const { 
    auth, 
    plan,
    profile: {
      fname
    }
  } = getState();

  if( auth.authenticated ) {
    const api = plansAPI();

    let {
      planName,
      donations,
      planId,
      status
    } = plan;
  
    if( status.dirty ) {
      !planName && (planName = `${fname}'s Donation Plan`);    

      const body = { 
          planName,
          donations
      };
      
      const onError = e => dispatch({ type: SAVE_PLAN, status: 'error', value: e.toString() });

      if( planId ) {

        api.update( planId, body )
              .then( () => dispatch({ type: SAVE_PLAN, status: 'saved' }))
              .catch( onError );

      } else {

        api.create( body)
              .then( plan => dispatch({ type: SAVE_PLAN, status: 'saved', value: plan.planId }) )
              .catch( onError );

      }
    }

  }
};

const clearPlan = () => ({ type: clearPlan });

module.exports = {
  TOGGLE_ITEM,
  ADD_PLAN_ITEM,
  SAVE_PLAN,
  CLEAR_PLAN,

  toggleItem,
  addPlanItem,
  savePlan,
  clearPlan
};