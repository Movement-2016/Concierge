import {
  toggleSelection
} from './groups';

const TOGGLE_ITEM   = 'TOGGLE_GROUP';
const ADD_PLAN_ITEM = 'ADD_PLAN_ITEM';


function _toggleItem (id) {
  return { type: TOGGLE_ITEM, id };
}

function toggleItem(id) {
  return function (dispatch) {
    const res = m => dispatch(m);

    return res(_toggleItem(id)) && res(toggleSelection(id));
  };
}

function addPlanItem(id,amount) {
  return { type: ADD_PLAN_ITEM, id, amount };
}

module.exports = {
  TOGGLE_ITEM,
  ADD_PLAN_ITEM,

  toggleItem,
  addPlanItem
};