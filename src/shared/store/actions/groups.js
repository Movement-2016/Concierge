const SET_VISIBILITY   = 'SET_VISIBILITY';
const TOGGLE_SELECTION = 'TOGGLE_SELECTION';
const INIT_FILTERS     = 'INIT_FILTERS';

function setVisibility(visibility) {
  return { type: SET_VISIBILITY, visibility };
}

function toggleSelection(id) {
  return { 
    type: TOGGLE_SELECTION, 
    id 
  };
}

function initFilters(filters) {
  return { type: INIT_FILTERS, filters };
}

module.exports = {
  SET_VISIBILITY,
  TOGGLE_SELECTION,
  INIT_FILTERS,

  setVisibility,
  toggleSelection,
  initFilters
};