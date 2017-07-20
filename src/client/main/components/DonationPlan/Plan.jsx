import React from 'react';

import StoreWatcher from '../StoreWatcher';
import StateOrgs from './StateOrgs.jsx';

import {
  getSelectedOrgs,
  organizeOrgsByState
} from '../../store/utils';

class Plan extends StoreWatcher(React.Component) {

  stateFromStore(storeState) {
    const {
      store,
      model: {
        orgs
      }
    } = this.props;

    const {
      groups: {
        selected,
        plan
      }
    } = store.getState();

    const sortedOrgs = orgs && organizeOrgsByState( getSelectedOrgs(selected,orgs) );

    this.setState({ sortedOrgs, plan });
  }

  get readonly() {
    return false;
  }

  render() {

    const {
      model: {
        groupFilters: filters,
        statesDict: states,
        colorSectionsIDDict: colorDict,
      },
      mobile,
      store
    } = this.props;

    const {
      sortedOrgs,
      plan
    } = this.state;

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
