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
  const { auth } = getState();
  if( auth.authenticated ) {
    
  }
  ({ type: SAVE_PLAN });
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