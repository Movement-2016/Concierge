const SET_VISIBILITY = 'SET_VISIBILITY';
const TOGGLE_SELECTION = 'TOGGLE_SELECTION';

function setVisibility(newVisibility) {
  return { type: SET_VISIBILITY, newVisibility };
}

function toggleSelection(id) {
  return { type: TOGGLE_SELECTION, id };
}

module.exports = {
  SET_VISIBILITY,
  TOGGLE_SELECTION,

  setVisibility,
  toggleSelection
};