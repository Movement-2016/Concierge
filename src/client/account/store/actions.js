import 'whatwg-fetch';
import { SET_PROFILE } from './constants';

export function setProfile (profile) {
  return { type: SET_PROFILE, profile};
}

