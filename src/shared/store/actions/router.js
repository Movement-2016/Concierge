import RouteRecognizer from 'route-recognizer';

const SET_ROUTES = 'SET_ROUTES';
const NAVIGATION_STARTS = 'NAVIGATION_STARTS';
const NAVIGATION_ENDS = 'NAVIGATION_ENDS';
const PATH_NOT_FOUND = 'PATH_NOT_FOUND';
const RENDER_HTML = 'RENDER_HTML';

const setNavigationStarts = ({ route, target }) => ({ type: NAVIGATION_STARTS, target, route });
const setNavigationEnds = () => ({ type: NAVIGATION_ENDS });
const pathNotFound = (payload, url) => ({ type: PATH_NOT_FOUND, payload, url });
const renderHTML = html => ({ type: RENDER_HTML, html });

let recognizer;

const setRoutes = routeMap => {
  !recognizer && (recognizer = new RouteRecognizer());
  /*
    routeMapEntry : {
        path,          (with substitutions e.g. /groups/:param1/:param2)
        routeModel:    (see reducers/router.js)
        browserOnly    (ensured boolean)
    }
  */
  routeMap.forEach(routeMapEntry =>
    recognizer.add([{ handler: routeMapEntry, path: routeMapEntry.path }])
  );
  return { type: SET_ROUTES, routeMap };
};

const urlToHandler = url => {
  const results = recognizer.recognize(url.toLowerCase());

  if (results) {
    // results is an array-like object with a 'queryParams' property

    var queryParams = results.queryParams || {};

    const mapper = ({ handler: { path, routeModel, browserOnly }, params = {} }) => ({
      params,
      queryParams,
      routeModel,
      path,
      url,
      browserOnly,
    });

    return results.slice().map(mapper);
  }
  return null;
};

const noopLocation = {
  hash: '',
};

const navigateTo = (url, payload = null) => {
  const _url = url;
  const _payload = payload;

  return dispatch => {
    const handlers = urlToHandler(_url);

    if (!handlers) {
      dispatch(pathNotFound(payload, _url));
      dispatch(setNavigationEnds());
      return;
    }

    const { routeModel, path, params, queryParams, url, browserOnly } = checkRecognizerResults(
      handlers
    );

    routeModel
      .model(params, queryParams)
      .then(model => {
        const meta = {
          route: {
            path,
            params,
            queryParams,
            url,
            location: (typeof document !== 'undefined' && document.location) || noopLocation,
          },
          target: {
            routeModel,
            model,
            browserOnly,
            payload: _payload,
          },
        };

        dispatch(setNavigationStarts(meta));
        dispatch(setNavigationEnds());
      })
      .catch(error => {
        console.log('ERROR DURING NAVIGATE', error); // eslint-disable-line no-console
        throw error;
      });
  };
};

const checkRecognizerResults = handlers => {
  if (process.env.NODE_ENV === 'production' && handlers.length > 1) {
    throw new Error('wups - don\'t do nested route handlers yet');
  }
  return handlers[0];
};

module.exports = {
  SET_ROUTES,
  NAVIGATION_STARTS,
  NAVIGATION_ENDS,
  PATH_NOT_FOUND,
  RENDER_HTML,

  setRoutes,
  renderHTML,
  // setNavigationStarts,
  // setNavigationEnds,
  // pathNotFound,
  navigateTo,
};
