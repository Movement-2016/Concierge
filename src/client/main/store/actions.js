import { INIT_GROUP_DATA, SET_SELECTED_GROUPS, TOGGLE_GROUP } from './constants';

export function initGroupData (data) {
  return { type: INIT_GROUP_DATA, data };
}

export function setSelectedGroups (favorites) {
  return { type: SET_SELECTED_GROUPS, favorites };
}

export function toggleGroup (id) {
  return { type: TOGGLE_GROUP, id };
}
