import { SET_PROFILE } from '../actions/profile';

const initialState = {
  username: '',
  fname: '',
  lname: '',
  email: '',
  phone: '',
  picture: ''
};

export default function user (state = initialState, action) {
  switch (action.type) {

    case SET_PROFILE:
      return { ...state, ...action.profile };

    default:
      return state;
  }
}
