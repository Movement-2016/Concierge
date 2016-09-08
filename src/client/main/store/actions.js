import { 
  INIT_FILTERS,
  TOGGLE_ITEM,
  SET_VISIBILITY
} from './constants';

export function toggleItem (id) {
  return { type: TOGGLE_ITEM, id };
}

export function setVisibility(cat, tags) {
  return { type: SET_VISIBILITY, cat, tags };
}

export function initFilters(filters) {
  return { type: INIT_FILTERS, filters };
}
