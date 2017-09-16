const TOGGLE_SELECTION = 'TOGGLE_SELECTION';
const FILTER_TOGGLE    = 'FILTER_TOGGLE';
const FILTERS_CLEAR     = 'FILTERS_CLEAR';

const DEFAULT_STATE_FILTER = 'select-state';


const toggleSelection = id => ({ type: TOGGLE_SELECTION, id });

const toggleFilter = id => ({ type: FILTER_TOGGLE, id });

const filterClear = () => ({ type: FILTERS_CLEAR });

module.exports = {
  DEFAULT_STATE_FILTER,
  
  TOGGLE_SELECTION,
  FILTER_TOGGLE,
  FILTERS_CLEAR,

  toggleSelection,
  toggleFilter,
  filterClear
};