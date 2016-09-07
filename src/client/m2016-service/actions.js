import { INIT_SERVICE } from './constants';

export function initService (service) {
  return { type: INIT_SERVICE, service };
}
