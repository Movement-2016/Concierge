const TOGGLE_SELECTION = 'TOGGLE_SELECTION';
const TOGGLE_FILTER    = 'TOGGLE_FILTER';
const FILTER_CLEAR     = 'FILTER_CLEAR';
const STATE_FILTER     = 'STATE_FILTER';

const DEFAULT_STATE_FILTER = 'select-state';


const toggleSelection = id => ({ type: TOGGLE_SELECTION, id });

const toggleFilter = id => ({ type: TOGGLE_FILTER, id });

const filterClear = () => ({ type: FILTER_CLEAR });

const stateFilter = stateFilter => ({ type: STATE_FILTER, stateFilter });

module.exports = {
  DEFAULT_STATE_FILTER,
  
  TOGGLE_SELECTION,
  TOGGLE_FILTER,
  FILTER_CLEAR,
  STATE_FILTER,

  toggleSelection,
  toggleFilter,
  filterClear,
  stateFilter
};