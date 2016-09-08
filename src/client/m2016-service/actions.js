import { 
  INIT_SERVICE,
  TOGGLE_ITEM 
} from './constants';

export function initService (service) {
  return { type: INIT_SERVICE, service };
}

export function toggleItem(id) {
  return { type: TOGGLE_ITEM, id };
}