const TOGGLE_SELECTION = 'TOGGLE_SELECTION';
const TOGGLE_FILTER    = 'TOGGLE_FILTER';
const FILTER_CLEAR     = 'FILTER_CLEAR';
const STATE_FILTER     = 'STATE_FILTER';
const SET_VISIBILITY   = 'SET_VISIBILITY';

const DEFAULT_STATE_FILTER = 'select-state';


const toggleSelection = id => ({ type: TOGGLE_SELECTION, id });

const toggleFilter = id => ({ type: TOGGLE_FILTER, id });

const filterClear = () => ({ type: FILTER_CLEAR });

const stateFilter = stateFilter => ({ type: STATE_FILTER, stateFilter });

const setVisibility = visibility => ({ type: SET_VISIBILITY, visibility });

module.exports = {
  DEFAULT_STATE_FILTER,
  
  TOGGLE_SELECTION,
  TOGGLE_FILTER,
  FILTER_CLEAR,
  STATE_FILTER,
  SET_VISIBILITY,

  toggleSelection,
  toggleFilter,
  filterClear,
  stateFilter,
  setVisibility
};