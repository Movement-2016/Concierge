import React from 'react';
import { Router, Route, IndexRoute, applyRouterMiddleware, browserHistory } from 'react-router';
import useScroll from 'react-router-scroll/lib/useScroll';

import SelectPage from './SelectPage.jsx';
import PlanPage from './PlanPage.jsx';
import RegisterPage from '../../account/components/RegisterPage.jsx';
import LoginPage from '../../account/components/LoginPage.jsx';
import ContactPage from './ContactPage.jsx';
import ReportPage from './ReportPage.jsx';
import AboutPage from './AboutPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import StaffPage from './StaffPage.jsx';
import HomePage from './HomePage.jsx';

class Routes extends React.Component
{
  constructor() {
    super(...arguments);
    this.requireAuth = this.requireAuth.bind(this);
  }

  // When a route requires an authenticated user, set onEnter to this
  // method. If no authenticated user, change the route to the login
  // route, then continue to the original route.
  requireAuth (nextState, replace) {
    if (this.props.store.getState ().user.authenticated === false) {
      replace ({
        pathname: '/login',
        state: {
          nextPathname: nextState.location.pathname,
        },
      });
    }
  }

  render() {
      return (
        <Router
          history={browserHistory}
          render={applyRouterMiddleware (useScroll (scrolling))}
        >
          <Route path='/' component={this.props.App}>
            <IndexRoute component={HomePage} />
            <Route path='/groups' component={SelectPage} onEnter={this.requireAuth} />
            <Route path='/plan' component={PlanPage} onEnter={this.requireAuth} />
            <Route path='/aboutus' component={AboutPage} />
            <Route path='/getintouch' component={ContactPage} />
            <Route path='/report' component={ReportPage} onEnter={this.requireAuth} />
            <Route path='/signup' component={RegisterPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/staff' component={StaffPage} />
            <Route path='*' component={NotFoundPage} />
          </Route>
        </Router>
      );
  }
}


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

module.exports = Routes;
