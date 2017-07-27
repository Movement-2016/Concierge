import { SET_PROFILE } from '../actions/user';

const initialState = {
  username: '',
  fname: '',
  lname: '',
  email: '',
  phone: '',
};

export default function user (state = initialState, action) {
  switch (action.type) {

    case SET_PROFILE:
      return { ...state, ...action.profile };

    default:
      return state;
  }
}
