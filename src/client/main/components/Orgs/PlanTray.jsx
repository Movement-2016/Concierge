import React  from 'react';
import Link   from '../../../services/LinkToRoute';

function PlanTray(props) {
  const numGroups = props.numGroups;
  const s = numGroups !== 1 ? 's' : '';

  return(
    <div className={'donation-plan-tray' + (numGroups ? ' has-groups' : '')} >
      <div className="info-area">
        <div className="title">My Donation Plan</div>
        <div className="info">{numGroups} Group{s}</div>
      </div>
      <div className="button-area">
        <Link to="/plan" className="plan-btn btn-flat waves-effect waves-light">
          <i className="material-icons">playlist_add_check</i>
          <span className="button-text">Go to plan</span>
        </Link>
      </div>
    </div>
  );
}

module.exports = PlanTray;
