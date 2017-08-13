const SET_VISIBILITY   = 'SET_VISIBILITY';
const TOGGLE_SELECTION = 'TOGGLE_SELECTION';
const INIT_FILTERS     = 'INIT_FILTERS';
const FILTER_REQUEST   = 'FILTER_REQUEST';
const FILTER_CLEAR     = 'FILTER_CLEAR';
const STATE_FILTER     = 'STATE_FILTER';

const DEFAULT_STATE_FILTER = 'select-state';

const setVisibility = visibility => ({ type: SET_VISIBILITY, visibility });

const toggleSelection = id => ({ type: TOGGLE_SELECTION, id });

const initFilters = filters => ({ type: INIT_FILTERS, filters });

const filterRequest = (category, term, addFilter) => ({ type: FILTER_REQUEST, category, term, addFilter });

const filterClear = () => ({ type: FILTER_CLEAR });

const stateFilter = stateFilter => ({ type: STATE_FILTER, stateFilter });

module.exports = {
  DEFAULT_STATE_FILTER,
  
  SET_VISIBILITY,
  TOGGLE_SELECTION,
  INIT_FILTERS,
  FILTER_REQUEST,
  FILTER_CLEAR,
  STATE_FILTER,

  setVisibility,
  toggleSelection,
  initFilters,
  filterRequest,
  filterClear,
  stateFilter
};