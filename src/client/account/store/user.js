import { SET_AUTHENTICATED, SET_PROFILE, SET_USER_FIRSTNAME, SET_USER_LASTNAME,
  SET_USER_EMAIL, SET_USER_PHONE, UPDATE_PLANNED, UPDATE_GIVEN } from './constants';
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
    case SET_AUTHENTICATED:
      return Object.assign ({}, state, {
        authenticated: action.authenticated,
        username: action.username,
      });

    case SET_PROFILE:
      return { ...state, ...action.profile };

    case SET_USER_FIRSTNAME:
      return Object.assign ({}, state, {
        fname: action.fname,
      });

    case SET_USER_LASTNAME:
      return Object.assign ({}, state, {
        lname: action.lname,
      });

    case SET_USER_EMAIL:
      return Object.assign ({}, state, {
        email: action.email,
      });

    case SET_USER_PHONE:
      return Object.assign ({}, state, {
        phone: action.phone,
      });

    case UPDATE_PLANNED: {
      let found = false;
      let donations = state.donations.map (donation => {
        if (donation.group !== action.group) {
          return (donation);
        }
        found = true;
        return {
          group: donation.group,
          amount: action.amount,
          given: donation.given,
        };
      });
      if (!found) {
        donations = [...donations, { group: action.group, amount: action.amount, given: false }];
      }
      return Object.assign ({}, state, { donations });
    }
    case UPDATE_GIVEN: {
      let found = false;
      let donations = state.donations.map (donation => {
        if (donation.group !== action.group) {
          return (donation);
        }
        found = true;
        return {
          group: donation.group,
          amount: donation.amount,
          given: action.given,
        };
      });
      if (!found) {
        donations = [...donations, { group: action.group, amount: '0', given: action.given }];
      }
      return Object.assign ({}, state, { donations });
    }
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
