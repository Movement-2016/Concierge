const TOGGLE_ITEM   = 'TOGGLE_GROUP';
const ADD_PLAN_ITEM = 'ADD_PLAN_ITEM';

function toggleItem (id) {
  return { type: TOGGLE_ITEM, id };
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