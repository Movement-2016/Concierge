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
      model: {
        groupFilters: filters,
        statesDict: states,
        colorSectionsIDDict: colorDict,
        orgs
      },
      store,
      mobile
    } = this.props;

    const {
      groups: {
        selected,
        plan
      }
    } = store.getState();

    const sortedOrgs = orgs && organizeOrgsByState(getSelectedOrgs(selected,orgs));

    const shared = {
      plan,
      filters,
      store,
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

module.exports=Plan;
