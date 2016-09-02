import { INIT_GROUP_DATA, SET_SELECTED_GROUPS, TOGGLE_GROUP } from './constants';

const initialState = {};
// cache stateList
const stateList = [];
const colors = ['purple', 'light-blue', 'light-red', 'dark-blue', 'dark-red'];

export default function groups (state = initialState, action) {
  switch (action.type) {
    case INIT_GROUP_DATA: {
      for (const item of action.data) {
        item.favorite = false;
      }
      /* eslint no-nested-ternary: off */
      action.data.sort ((a, b) => {
        const acolor = colors.indexOf (a.color);
        const bcolor = colors.indexOf (b.color);
        return (acolor < bcolor) ? -1 : (acolor > bcolor) ? 1 :
          (a.state < b.state) ? -1 : (a.state > b.state) ? 1 :
          (a.name.toUpperCase () < b.name.toUpperCase ()) ? -1 :
            (a.name.toUpperCase () > b.name.toUpperCase ()) ? 1 : 0;
      });
      // cache state list
      let lastState;
      for (const item of action.data) {
        if (item.state !== lastState) {
          stateList.push (item.state);
          lastState = item.state;
        }
      }
      stateList.sort ((a, b) => { return (a > b ? 1 : -1); });
      return action.data;
    }
    case SET_SELECTED_GROUPS:
      return state.map ((group) => {
        if (action.favorites.indexOf (group.id) === -1) {
          return ((group.favorite)
            ? Object.assign ({}, group, { favorite: false })
            : group);
        } else {
          return ((group.favorite)
            ? group
            : Object.assign ({}, group, { favorite: true }));
        }
      });

    case TOGGLE_GROUP:
      return (state.map ((group) => {
        if (group.id === action.id) {
          return (Object.assign ({}, group, { favorite: !group.favorite }));
        }
        return (group);
      }));

    default:
      return state;
  }
}

/**
 * Get list of states that have one or more organizations
 */
export function getStateList () {
  return stateList;
}
