import React from 'react';

import { 
  Router, 
  Route, 
  IndexRoute, 
  applyRouterMiddleware, 
  browserHistory 
} from 'react-router';

import useScroll from 'react-router-scroll/lib/useScroll';

import CustomDonatePage from './CustomDonatePage.jsx';
import HouseParty       from './HouseParty.jsx';
import ContactPage      from './ContactPage.jsx';
import AboutPage        from './AboutPage.jsx';
import NotFoundPage     from './NotFoundPage.jsx';
import HomePage         from './HomePage.jsx';
import DonatePage       from './DonatePage.jsx';
import ShoppingCart     from './ShoppingCart';

class Routes extends React.Component
{
  render() {
      return (
        <Router
          history={browserHistory}
          render={applyRouterMiddleware (useScroll (scrolling))}
        >
          <Route path='/' component={this.props.App}>
            <IndexRoute component={HomePage} />
            <Route path='/donate'     component={DonatePage} />
            <Route path='/groups'     component={CustomDonatePage}  />
            <Route path='/plan'       component={ShoppingCart} />
            <Route path='/aboutus'    component={AboutPage} />
            <Route path='/getintouch' component={ContactPage} />
            <Route path='/houseparty' component={HouseParty} />
            <Route path='*'           component={NotFoundPage} />
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
