import {
  INIT_FILTERS,
  TOGGLE_ITEM,
  SET_VISIBILITY,
  ADD_PLAN_ITEM
} from './constants';

export function toggleItem (id) {
  return { type: TOGGLE_ITEM, id };
}

export function setVisibility(newVisibility) {
  return { type: SET_VISIBILITY, newVisibility };
}

export function initFilters(filters) {
  return { type: INIT_FILTERS, filters };
}

export function addPlanItem(id,amount) {
  return { type: ADD_PLAN_ITEM, id, amount };
}
