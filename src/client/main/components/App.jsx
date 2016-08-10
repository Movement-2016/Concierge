import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, applyRouterMiddleware, browserHistory } from 'react-router';
import useScroll from 'react-router-scroll/lib/useScroll';
import { Provider } from 'react-redux';
import Nav from './Nav.jsx';
import configureStore from '../../store/configureStore';
import { initGroupData, setSelectedGroups } from '../store/actions';
import { verifyLogin } from '../../account/store/actions';

import SelectPage from './SelectPage.jsx';
import PlanPage from './PlanPage.jsx';
import RegisterPage from '../../account/components/RegisterPage.jsx';
import LoginPage from '../../account/components/LoginPage.jsx';
import ContactPage from './ContactPage.jsx';
import ReportPage from './ReportPage.jsx';
import AboutPage from './AboutPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import StaffPage from './StaffPage.jsx';

const store = configureStore ();
store.dispatch (initGroupData (window.__GROUP_DATA__));
store.dispatch (verifyLogin ())
.then (() => {
  render (
    <Router
      history={browserHistory}
      render={applyRouterMiddleware (useScroll (scrolling))}
    >
      <Route path='/' component={App}>
        <IndexRoute component={SelectPage} />
        <Route path='/plan' component={PlanPage} onEnter={requireAuth} />
        <Route path='/aboutus' component={AboutPage} />
        <Route path='/getintouch' component={ContactPage} />
        <Route path='/report' component={ReportPage} onEnter={requireAuth} />
        <Route path='/signup' component={RegisterPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/staff' component={StaffPage} />
        <Route path='*' component={NotFoundPage} />
      </Route>
    </Router>,
    document.getElementById ('app')
  );
});

export default class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      authenticated: store.getState ().user.authenticated,
    };

    let groups = this.props.location.query.groups;
    if (groups) {
      groups = groups.split (',');
      groups = groups.filter ((group) => {
        return Number.isInteger (Number (group));
      });
      groups = groups.map ((group) => { return Number (group); });
      store.dispatch (setSelectedGroups (groups));
    }
  }

  // on mount, subscribe to listen for authentication status changes
  componentWillMount () {
    this.unsubscribe = store.subscribe (() => {
      const authenticated = store.getState ().user.authenticated;
      if (this.state.authenticated !== authenticated) {
        this.setState ({ authenticated });
      }
    });
  }

  // before unmount, remove store listener
  componentWillUnmount () {
    this.unsubscribe ();
  }

  render () {
    return (
      <Provider store={store}>
        <div>
          <Nav loggedIn={this.state.authenticated} />
          <div>
            {this.props.children}
          </div>
        </div>
      </Provider>
    );
  }
}

App.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.node,
};

// When a route requires an authenticated user, set onEnter to this
// method. If no authenticated user, change the route to the login
// route, then continue to the original route.
function requireAuth (nextState, replace) {
  if (store.getState ().user.authenticated === false) {
    replace ({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname,
      },
    });
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
