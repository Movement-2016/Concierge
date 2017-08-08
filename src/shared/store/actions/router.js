import shallowEqual from '../../lib/shallowEqual';

const SET_ROUTE = 'SET_ROUTE';

const setRoute = ({ model={}, params={}, path='', queryParams={}}) => ({ type: SET_ROUTE, model, params, path, queryParams });

const equalIfSameRoute = (s1,s2) => s1.router.path !== s2.router.path || shallowEqual(s1,s2);

module.exports = {
  SET_ROUTE,

  setRoute,

  equalIfSameRoute
};