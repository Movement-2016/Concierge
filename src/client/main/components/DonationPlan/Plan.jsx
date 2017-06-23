import React              from 'react';


import {
  getSelectedOrgs,
  organizeOrgsByState
} from '../../store/utils';

import StateOrgs from './StateOrgs.jsx';

class Plan extends React.Component {

  get readonly() {
    return false;
  }

  render() {

    const {
      groupFilters: filters,
      statesDict: states,
      colorSectionsIDDict: colorDict,
      orgs,
    } = this.props;

    const {
      groups: {
        selected,
        plan
      }
    } = this.storeState;

    const sortedOrgs = orgs && organizeOrgsByState(getSelectedOrgs(selected,orgs));

    return (
      <div className="planning-section">
        {Object.keys(sortedOrgs).map( state => {
          return (
            <StateOrgs
              name={state}
              key={state}
              orgs={sortedOrgs[state]}
              plan={plan}
              filters={filters}
              colors={colorDict}
              readonly={this.readonly}
              state={states[state]}
              mobile={this.props.mobile}
            />
          );
      })}
      </div>
    );
  }
}

module.exports=Plan;
