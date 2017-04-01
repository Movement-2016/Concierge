import React from 'react';

import { 
  Router, 
  Route, 
  IndexRoute, 
  applyRouterMiddleware, 
  browserHistory,
} from 'react-router';

import HomePage from './HomePage.jsx';

import useScroll from 'react-router-scroll/lib/useScroll';

import RouteMap from '../../../shared/route-map';

const BrowserRouter = props => {

  return (
    <Router
      history={browserHistory}
      render={applyRouterMiddleware (useScroll (scrolling))}
    >
      <Route path= '/' component={props.App}>
        <IndexRoute component={HomePage} />
          { RouteMap.map( (r,i) => <Route key={i} {...r} /> ) }
      </Route>
    </Router>
  );
};


// Manage scroll position when changing pages
function scrolling (prev, current) {
  if (current.location.pathname === '/') {
    if ((prev) && (prev.location.pathname === '/')) {
      return true;
    } else {
      document.getElementById ('app').scrollTop = 0;
      return true;
    }
  } else {
    document.getElementById ('app').scrollTop = 0;
    return true;
  }
}

module.exports = BrowserRouter;
