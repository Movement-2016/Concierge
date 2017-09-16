
import { 
  NAVIGATION_STARTS,
  NAVIGATION_ENDS,
  PATH_NOT_FOUND,
  RENDER_HTML
} from '../actions/router';

const INITIAL_STATE = {
  target: {
    routeModel: {
      paths: [],  // [ '/foo', '/foo/:bar' ]
      meta: '',  // HTML <meta tags
      title: '', // value for <title tag
      model: () => Promise.resolve({}), 
      component: null, //  React.Component
      browserOnly: true //  might be undefined
    },
    payload: { res: {}, req: {}, next: () => null }, // http server
    model: {}, // result of model promise above
    browserOnly: true // ensured version of flag from routeModel
  },
  route: {
    url: '',          //     /foo/101?baz=yes
    path: '',         //    /foo/:bar
    params: {},       //    { bar: 101 }
    queryParams: {},  //    { baz: 'yes'}

    location: { hash: ''}, // document.location object
  },
  html: null, // result of serverside render
  navigating: false,
  notFound: false
};

const reducer = (state = INITIAL_STATE, action) => {

  switch(action.type) {

    case NAVIGATION_STARTS: {
        const {
          route: {
            path,
            params,
            queryParams,
            url,
            location,
          },
          target: {
            routeModel,
            model,
            browserOnly,
            payload,
          }
        } = action;

      return {
        ...state,
        route: { path, params, queryParams, url, location },
        target: { routeModel, model, browserOnly, payload },
        navigating: true,
        notFound: false
      };
    }

    case RENDER_HTML: {
      const { html } = action;
      return { ...state, html };
    }

    case NAVIGATION_ENDS: {
      return {
        ...state,
        navigating: false,
        notFound: false
      };
    }

    case PATH_NOT_FOUND: {
      const {
        url, 
        payload
      } = action;
      return {
        ...state,
        target: {
          payload
        },
        route: {
          url
        },
        notFound: true
      };
    }
  }
  
  return state;
};

module.exports = reducer;
