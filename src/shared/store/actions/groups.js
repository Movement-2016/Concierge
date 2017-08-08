const SET_VISIBILITY   = 'SET_VISIBILITY';
const TOGGLE_SELECTION = 'TOGGLE_SELECTION';
const INIT_FILTERS     = 'INIT_FILTERS';
const SET_MODEL        = 'SET_MODEL';

function setVisibility(visibility) {
  return { type: SET_VISIBILITY, visibility };
}

function toggleSelection(id) {
  return { type: TOGGLE_SELECTION, id };
}

function initFilters(filters) {
  return { type: INIT_FILTERS, filters };
}

function setModel(model) {
  return { type: SET_MODEL, model };
}

module.exports = {
  SET_VISIBILITY,
  TOGGLE_SELECTION,
  INIT_FILTERS,
  SET_MODEL,

  setVisibility,
  toggleSelection,
  initFilters,
  setModel
};