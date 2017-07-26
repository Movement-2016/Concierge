import React from 'react';
import { connect } from 'react-redux';

import StateOrgs from './StateOrgs.jsx';

import {
  getSelectedOrgs,
  organizeOrgsByState
} from '../../shared/lib/group-utils';

class _Plan extends React.Component {

  get readonly() {
    return false;
  }

  render() {

    const {
      model: {
        groupFilters: filters,
        statesDict: states,
        colorSectionsIDDict: colorDict,
        orgs
      },
      mobile,
      selected,
      plan
    } = this.props;

    const sortedOrgs = orgs && organizeOrgsByState( getSelectedOrgs(selected,orgs) );

    const shared = {
      plan,
      filters,
      mobile,
      readonly: this.readonly,
      colors: colorDict
    };

    return (
      <div className="planning-section">
        {Object.keys(sortedOrgs).map( state => {
          return (
            <StateOrgs
              {...shared}
              name={state}
              key={state}
              orgs={sortedOrgs[state]}
              state={states[state]}
            />
          );
      })}
      </div>
    );
  }
}

const mapStateToProps = s => ({ selected: s.groups.selected,
                                plan:     s.plan.donations
                              });

const Plan = connect(mapStateToProps)(_Plan);

module.exports = Plan;
