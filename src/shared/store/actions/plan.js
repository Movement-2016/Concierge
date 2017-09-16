import plansAPI from '../../services/plans';

const TOGGLE_ITEM   = 'TOGGLE_GROUP';
const ADD_PLAN_ITEM = 'ADD_PLAN_ITEM';
const SAVE_PLAN     = 'SAVE_PLAN';
const CLEAR_PLAN    = 'CLEAR_PLAN';
const GET_PLAN      = 'GET_PLAN';
const LOCK_PLAN     = 'LOCK_PLAN';

const requiresLogin = true;

const clearPlan = () => ({ type: clearPlan });

const lockPlan = locked => ({ type: LOCK_PLAN, locked });

const toggleItem = group => ({ type: TOGGLE_ITEM, group, requiresLogin });

const addPlanItem = (group,amount) => ({ type: ADD_PLAN_ITEM, group, amount, requiresLogin });

const getPlan = () => (dispatch,getState) => {

  const { 
    auth: {
      authenticated = false
    }
  } = getState();

  if( authenticated ) {
    const api = plansAPI();

    api.list().then( plans => {
      if( plans && plans.length ) {
        dispatch( { type: GET_PLAN, plan: plans[0] } );
      }
    });
  }

};

const savePlan = () => (dispatch,getState) => {
  const { 
    auth, 
    plan,
    profile: {
      fname
    }
  } = getState();

  if( auth.authenticated ) {
    let {
      planName,
      donations,
      planId,
      status,
      locked
    } = plan;
  
    if( !locked && status.dirty ) {

      const api = plansAPI();

      dispatch( lockPlan(true) );

      !planName && (planName = `${fname}'s Donation Plan`);    

      const body = { 
          planName,
          donations
      };
      
      const _dispatch = d => (dispatch(d),dispatch(lockPlan(false)));

      const onError = e => _dispatch({ type: SAVE_PLAN, status: 'error', value: e.toString() });

      if( planId ) {

        api.update( planId, body )
              .then( () => _dispatch({ type: SAVE_PLAN, status: 'saved' }))
              .catch( onError );

      } else {

        api.create( body)
              .then( plan => _dispatch({ type: SAVE_PLAN, status: 'saved', value: plan.planId }) )
              .catch( onError );

      }
    }

  }
};

module.exports = {
  TOGGLE_ITEM,
  ADD_PLAN_ITEM,
  SAVE_PLAN,
  CLEAR_PLAN,
  GET_PLAN,

  toggleItem,
  addPlanItem,
  savePlan,
  clearPlan,
  getPlan
};