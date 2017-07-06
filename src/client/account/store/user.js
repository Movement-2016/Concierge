import {  SET_PROFILE } from './constants';
import { SET_SELECTED_GROUPS, TOGGLE_GROUP } from '../../main/store/constants';

const initialState = {
  authenticated: false,
  username: '',
  fname: '',
  lname: '',
  email: '',
  phone: '',
  favorites: [],
  donations: [],
};

export default function user (state = initialState, action) {
  switch (action.type) {

    case SET_PROFILE:
      return { ...state, ...action.profile };

    case SET_SELECTED_GROUPS:
      return Object.assign ({}, state, { favorites: action.favorites });

    case TOGGLE_GROUP: {
      let favorites;
      const index = state.favorites.indexOf (action.id);
      if (index === -1) {
        favorites = [...state.favorites, action.id];
      } else {
        favorites = state.favorites.slice (0, index).concat (state.favorites.slice (index + 1));
      }
      return Object.assign ({}, state, { favorites });
    }
    default:
      return state;
  }
}
