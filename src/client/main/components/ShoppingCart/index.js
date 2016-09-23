import React    from 'react';
import { Link } from 'react-router';

import PlanForm from './PlanForm.jsx';
import Plan     from './Plan.jsx';
import Summary  from './Summary.jsx';
import ContentPage from '../ContentPage.jsx';

const GroupsLinkButton = () => {
  return (
    <Link className="btn-floating groups-link pinned" to="/groups" title="Go back to groups"><i className="material-icons">list</i></Link>
    );
};

class Cart extends React.Component {

  render() {
    return (
      <ContentPage.Shell title="Plan Your Contribution" name="shopping-cart">
        <GroupsLinkButton />
        <div className="shopping-cart">
            <p>Use this worksheet to help plan how to most effectively make your donations to grassroots movement groups.</p> 
            <div className="donor-area"> 
              <Plan />
              <PlanForm />
              <Summary />
          </div>
        </div>
      </ContentPage.Shell>
    );
  }
}

module.exports = Cart;

