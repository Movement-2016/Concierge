import React from 'react';

import { 
  Router, 
  Route, 
  IndexRoute, 
  applyRouterMiddleware, 
  browserHistory 
} from 'react-router';

import useScroll from 'react-router-scroll/lib/useScroll';

import ContentPage      from './ContentPage.jsx';

import CustomDonatePage from './CustomDonatePage.jsx';
import HouseParty       from './HouseParty.jsx';
import ContactPage      from './ContactPage.jsx';
import NotFoundPage     from './NotFoundPage.jsx';
import HomePage         from './HomePage.jsx';
import DonatePage       from './DonatePage.jsx';
import StatePage        from './StatePage.jsx';
import AdvisorsPage     from './AdvisorPage.jsx';

import ShoppingCart     from './ShoppingCart';
import PlanSummaryPage  from './ShoppingCart/SummaryPage.jsx';
import ConsultPage      from './ShoppingCart/ConsultPage.jsx';
import PlanProfilePage  from './Profile/Page.jsx';

const MeetTheTeamPage = () => <ContentPage page="meetTheTeam" />;
const AboutUsPage     = () => <ContentPage page="aboutUs" />;
const PressPage       = () => <ContentPage page="press" />;
const TookkitsPage    = () => <ContentPage page="toolkits" />;

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
            <Route path='/donate'               component={DonatePage} />
            <Route path='/groups(/:mobile)'     component={CustomDonatePage}  />
            <Route path='/state/:name'          component={StatePage} />
            
            <Route path='/plan'          component={ShoppingCart} />
            <Route path='/plan/summary'  component={PlanSummaryPage} />
            <Route path='/plan/profile'  component={PlanProfilePage} />
            <Route path='/plan/consult'  component={ConsultPage} />

            <Route path='/about'      component={AboutUsPage} />
            <Route path='/advisors'   component={AdvisorsPage} />
            <Route path='/team'       component={MeetTheTeamPage} />
            <Route path='/getintouch' component={ContactPage} />
            <Route path='/houseparty' component={HouseParty} />
            <Route path='/press'      component={PressPage} />
            <Route path='/toolkits'   component={TookkitsPage} />
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
