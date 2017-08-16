import React from 'react';
import { connect } from 'react-redux';

import StateOrgs from './StateOrgs.jsx';

const _Plan = ({

      states,
      groups,
      donations: plan,
      mobile,
      readonly = false,

    }) => <div className="planning-section">
            {states.map( state => <StateOrgs key={state.id} {...{plan,mobile,readonly,state,groups}} /> )}
          </div>
;

const mapStateToProps = ({
  router: {
    target: {
      model: {
        db
      },      
    }
  },
  groups: {
    selected
  },
  plan: {
    donations
  }
}) => ({
  groups: db.denormalizedSelectedGroups(selected),
  states: db.denormalizedSelectedStates(selected),
  donations
});

const Plan = connect(mapStateToProps)(_Plan);

module.exports = Plan;
